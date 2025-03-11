import { createLogger, format, transports } from "winston";
const { combine, prettyPrint } = format;

export const logger = createLogger({
  transports: [new transports.Console()],
  format: combine(format.timestamp(), prettyPrint()),
});
