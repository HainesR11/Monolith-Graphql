import { importSchema } from "graphql-import";

export const TypeDefs = [
  importSchema("src/TypeDefs/Posts/PostSchema.graphql"),
  importSchema("src/TypeDefs/Users/UserSchema.graphql"),
];
