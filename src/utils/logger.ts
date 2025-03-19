import {
  add,
  addColors,
  createLogger,
  error,
  format,
  info,
  transports,
} from "winston";
const { combine, prettyPrint, label, colorize, errors } = format;
import { TransformableInfo } from "logform";
import { TLogger } from "../types/types";

interface TTransportInfo extends TransformableInfo {
  query?:
    | {
        type: "Query" | "Mutation" | "Not used";
        query?: string;
        stacktrace?: string;
      }
    | undefined;
}

const messageSwitch = ({ level, query, message }: TTransportInfo) => {
  switch (true) {
    case query?.type === "Query" || query?.type === "Mutation":
      return `${query?.type} ran Successfully`;
    case level === "Error":
      return `Error running ${query?.type}`;
    default:
      return message;
  }
};

const querySwitch = ({ query }: TTransportInfo) => {
  switch (true) {
    case query?.type === "Query" || query?.type === "Mutation":
      return { query: query?.query, type: query?.type };
  }
};

const myFormatter = format((info: TTransportInfo) => {
  return {
    ...{ ...info, message: messageSwitch(info) },
    ...(info.query !== undefined && querySwitch(info)),
    timestamp: new Date(),
    environment: process.env.NODE_ENV?.toLocaleUpperCase(),
  };
})();

export const logger: TLogger = createLogger({
  transports: new transports.Console(),
  format: combine(
    myFormatter,
    errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss", alias: "timestamp" }),
    prettyPrint()
  ),
});
