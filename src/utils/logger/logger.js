import winston from "express-winston";
import { format } from "winston";
import { transports } from "winston";
import { dateSet } from "../dateSet/dateSet.js";

const customFormat = format.printf(({ level, meta }) => {
  return `${dateSet()} ${level}: ${meta.message}`;
});

export const logger = winston.logger({
  transports: [
    // new transports.Console(),
    new transports.File({
      level: "warn",
      filename: "warn.log",
    }),
    new transports.File({
        level:'error',
        filename:'Error.log',
        })
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  ),
  statusLevels:true,
});

export const errorLogger = winston.errorLogger({
  transports: [
    // new transports.Console(),
    new transports.File({
      level: "error",
      filename: "InternalError.log",
    }),
  ],
  format: format.combine(
    format.json(),
    customFormat
  ),
  statusLevels: true,
});
