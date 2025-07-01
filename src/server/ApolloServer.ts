import { ApolloServer } from "apollo-server-express";
import { Express } from "express";

// Types
import { ApolloServerContext } from "../types/types";

// Schemas

// Middleware
import { logger } from "../utils/logger";
import pool from "../Services/Postgres/postgres";
import CombinedResolvers from "../Resolvers";
import { TypeDefs } from "../TypeDefs";

const startApolloServer = async (app: Express) => {
  const isInterspectionQuery = (query: string) => {
    if (query.includes("IntrospectionQuery")) {
      return true;
    }
    return false;
  };

  const isProduction = process.env.NODE_ENV === "production";

  const server = new ApolloServer<ApolloServerContext>({
    typeDefs: TypeDefs,
    resolvers: CombinedResolvers,
    introspection: isProduction,
    plugins: [
      {
        async serverWillStart() {
          await pool.connect().then(() => {
            logger.info("Connected to the Postgres Database");
          });
        },

        async requestDidStart({ request }) {
          if (!isInterspectionQuery(request.query ?? "")) {
            logger.info({
              type: "Query",
              query: request.query ?? "",
            });
          }
        },
      },
    ],
  });

  await server.start();

  app.all("/graphiql", (_, res) => res.redirect("/"));

  server.applyMiddleware({
    app,
    path: "/",
    cors: true,
    bodyParserConfig: true,
  });
};

export default startApolloServer;
