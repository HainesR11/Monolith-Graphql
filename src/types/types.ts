import { Logger } from "winston";

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

export type TUsers = {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export interface TLogger extends Logger {
  debug(
    message?: any,
    query?: {
      type: string;
      query: string;
    }
  ): Logger;
  info(
    message?: any,
    query?: {
      type: string;
      query: string;
    }
  ): Logger;
  warn(
    message?: any,
    query?: {
      type: string;
      query: string;
    }
  ): Logger;
  error(
    message?: any,
    query?: {
      type: string;
      query: string;
    }
  ): Logger;
}