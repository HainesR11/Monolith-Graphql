import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "http";

// Types
import { ApolloServerContext } from "./types/types";

// Schemas
import schema from "./Schema/Posts/PostsSchema";

// Middleware
import { logger } from "./utils/logger";
import pool from "./Services/Postgres/postgres";

const app = express();

const httpServer = http.createServer(app);

const isInterspectionQuery = (query: string) => {
  if (query.includes("IntrospectionQuery")) {
    return true;
  }
  return false;
};

const server = new ApolloServer<ApolloServerContext>({
  schema: schema,
  logger: logger,
  introspection: false,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart({ logger }) {
        await pool.connect().then(() => {
          logger.info("Connected to the Postgres Database");
        });

        httpServer
          .listen({ port: process.env.PORT })
          .once("listening", () => {
            logger.info(`Server ready at http://localhost:${process.env.PORT}`);
          })
          .on("error", (err) => {
            logger.error(err);
          });
      },

      async requestDidStart({ logger, request }) {
        if (!isInterspectionQuery(request.query ?? "")) {
          logger.info({ query: request.query });
        }
      },
    },
  ],
});

await server.start();

app.use(
  "/graphiql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);
