import { logger } from "./logger";
import { Response } from "express";

export function failureTemplate(scode: number, message: string) {
  const template = {
    responseCode: scode,
    status: "failure",
    message: message,
  };
  return template;
}

export function successTemplate(scode: number, message: string, data?: any) {
  const template = {
    responseCode: scode,
    status: "success",
    message: message,
    data: data,
  };
  return template;
}

// OTP MODULE
export function otpSentTemplate(destination: string) {
  return {
    responseCode: "200",
    status: "success",
    message: `OTP sent successfully to ${destination}`,
  };
}

export const sendError = (res: Response, msg: string, code = 400) => {
  const errorResponse = failureTemplate(code, msg);

  logger.log({
    level: "info",
    message: JSON.stringify(errorResponse),
    timestamp: new Date().toISOString(),
  });

  return res.status(code).json(errorResponse);
};
