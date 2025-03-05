import express from "express";
import cors from "cors";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import typeDefs from "./TypeDefs";
import resolvers from "./Resolvers";
import { ApolloServerContext } from "./types/types";
import schema from "./Schema";

import authentication from "./Helpers/useAuthentication";

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(authentication);

app.use(
  "/",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enables GraphiQL UI
  })
);


await new Promise<void>((Resolvers) => {
  httpServer.listen({ port: process.env.PORT }, Resolvers);
}).then(() => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
