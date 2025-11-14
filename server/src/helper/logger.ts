import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
});

//  If we're not in production then log to the `console` with the format:
//  `${info.level}: ${info.message} JSON.stringify({ ...rest }) `

if (process.env.NODE_ENV == "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
