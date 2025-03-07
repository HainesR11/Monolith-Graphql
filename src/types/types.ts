export interface ApolloServerContext {
  token?: string;
}

export enum QueryTypes {
  Query = "query",
  Mutation = "mutation",
}

export enum ResultsTypes {
  Single = "Single",
  Array = "Array",
}
