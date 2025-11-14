import { Request, Response } from "express";
import { logger } from "../../helper/logger";
import { successTemplate } from "../../helper/template";

export function logout(req: Request, res: Response) {
  res.clearCookie("codeclash-auth-token");
  logger.log({
    level: "info",
    message: JSON.stringify(successTemplate(201, "user logged out successfully")),
  });
  res
    .status(200)
    .json(successTemplate(201, "user logged out successfully"));
}
