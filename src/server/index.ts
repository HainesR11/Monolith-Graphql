import express from "express";
import http from "http";

// Middleware
import { logger } from "../utils/logger";
import startApolloServer from "./ApolloServer";

const startServer = () => {
  const app = express();

  const httpServer = http.createServer(app);

  httpServer
    .listen({ port: process.env.PORT })
    .once("listening", () => {
      logger.info(`Server ready at http://localhost:${process.env.PORT}`);
    })
    .on("error", (err) => {
      logger.error(err);
    });

  startApolloServer(app);
};

startServer();
