import { createLogger, format, transports } from "winston";
const { combine, prettyPrint, errors } = format;
import { TLogger } from "../types/types";
import { TransformableInfo } from "logform";

interface ITransformableInfo extends TransformableInfo {
  query?:
    | {
        type: "Query" | "Mutation" | "Not used";
        query?: string;
        stacktrace?: string;
      }
    | undefined;
}

const messageSwitch = ({ type, query, level, message }: ITransformableInfo) => {
  switch (true) {
    case type === "Query" || type === "Mutation":
      return `${type} ran Successfully`;
    case level === "Error":
      return `Error running ${query?.type}`;
    default:
      return message;
  }
};

const querySwitch = ({ query }: ITransformableInfo) => {
  switch (true) {
    case query?.type === "Query" || query?.type === "Mutation":
      return { query: query?.query, type: query?.type };
  }
};

const environment = () => {
  if (process.env.NODE_ENV === "prod") {
    return "production";
  }
  return "development";
};

const customFormatter = format((info: ITransformableInfo) => {
  return {
    ...{ ...info, message: messageSwitch(info) },
    ...(info.query !== undefined && querySwitch(info)),
    environment: environment().toLocaleUpperCase(),
    timestamp: new Date(),
  };
})();

export const logger: TLogger = createLogger({
  transports: new transports.Console(),
  format: combine(
    customFormatter,
    errors({ stack: true }),
    format.timestamp({ format: "HH:mm:ss YYYY-MM-DD", alias: "timestamp" }),
    prettyPrint()
  ),
});
