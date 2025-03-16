export interface ApolloServerContext {
  token?: string;
}

export enum QueryTypes {
  Query = "query",
  Mutation = "mutation",
}

export enum responseTypes {
  Single = "Single",
  Array = "Array",
}
