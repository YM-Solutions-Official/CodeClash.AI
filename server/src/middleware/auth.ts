import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { logger } from "../helper/logger";
import { failureTemplate } from "../helper/template";

interface AuthTokenPayload extends JwtPayload {
  payload: any; // replace `any` with your IUser type
}

export async function authRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const userCookie = req.cookies["codeclash-auth-token"];

    if (!userCookie) {
      return res.status(401).json(failureTemplate(400, "unauthorized route"));
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
      logger.log({ level: "error", message: "No JWT SECRET" });
      return res.status(500).json(failureTemplate(500, "Server error"));
    }

    const decoded = jwt.verify(userCookie, JWT_SECRET_KEY) as AuthTokenPayload;

    req.user = decoded.payload;

    next();
  } catch (error) {
    logger.log({
      level: "error",
      message: "Failed decoding user cookie.",
      error,
    });

    return res.status(401).json(failureTemplate(401, "Invalid or expired token."));
  }
}
