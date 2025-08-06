import { ApolloServer } from "apollo-server-express";
import { Express } from "express";

// Types
import { ApolloServerContext } from "../types/types";

// Schemas

//Services
import pool from "../Services/Postgres/postgres";

// Middleware
import { logger } from "../utils/logger";
import CombinedResolvers from "../Resolvers";
import { TypeDefs } from "../TypeDefs";
import getRequestType from "../utils/getRequestType";

const startApolloServer = async (app: Express) => {
  const isInterspectionQuery = (query: string) => {
    if (query.includes("IntrospectionQuery")) {
      return true;
    }
    return false;
  };

  const server = new ApolloServer<ApolloServerContext>({
    typeDefs: TypeDefs,
    resolvers: CombinedResolvers,
    introspection: true,
    plugins: [
      {
        async serverWillStart() {
          await pool.connect().then(() => {
            logger.info("Connected to the Postgres Database");
          });
        },

        async requestDidStart({ request }) {
          if (!isInterspectionQuery(request.query ?? "")) {
            logger.info(undefined, {
              type: getRequestType(request.query),
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
