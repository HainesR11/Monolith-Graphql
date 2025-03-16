import { makeExecutableSchema } from "@graphql-tools/schema";
import { importSchema } from "graphql-import";

export const TypeDefs = [
  importSchema("src/TypeDefs/Posts/PostSchema.graphql"),
  importSchema("src/TypeDefs/Users/UserSchema.graphql"),
];
