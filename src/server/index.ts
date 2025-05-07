import express from "express";
import http from "http";

// Middleware
import { logger } from "../utils/logger";

// Server
import startApolloServer from "./ApolloServer";
import AuthenticationMiddlewear from "../Middleware/authentication/useAuthentication";

const startServer = () => {
  const app = express();

  const httpServer = http.createServer(app);

  // app.use(AuthenticationMiddlewear);

  httpServer
    .listen({ port: process.env.PORT })
    .once("listening", () => {
      logger.info(`Server ready at http://localhost:${process.env.PORT}`);
      startApolloServer(app);
    })
    .on("error", (err) => {
      logger.error(err);
    });
};

startServer();
