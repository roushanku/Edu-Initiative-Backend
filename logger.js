// logger.js
import { createLogger, format, transports } from "winston";

// Define the color scheme for log levels
const logColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

// Add the colors to Winston
import winston from "winston";
winston.addColors(logColors);

const logger = createLogger({
  level: "info", // Default level
  format: format.combine(
    format.colorize(), // Apply colors to the console output
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`; // Custom format
    })
  ),
  transports: [
    new transports.Console(), // Log to console with colors
    new transports.File({
      // Log to file without colors
      filename: "combined.log",
      format: format.combine(
        format.uncolorize(), // Remove colors for the log file
        format.timestamp(),
        format.json() // Log in JSON format for the file
      ),
    }),
  ],
});

export default logger;
