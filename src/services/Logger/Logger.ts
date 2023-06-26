import * as winston from "winston";

class Logger {
  private logger: any;

  constructor () {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: "log/error.log", level: "error" }),
        new winston.transports.Console({ level: "info", format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: "log/exceptions.log" }),
        new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
      ]
    });
  }

  info (message: any) {
    this.logger.log({
      level: "info",
      message: message
    });
  }

  error (message: any) {
    this.logger.log({
      level: "error",
      message: message
    });
  }
}

export default Logger;
