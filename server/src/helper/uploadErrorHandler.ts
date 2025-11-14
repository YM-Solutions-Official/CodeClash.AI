import { Request, Response, NextFunction, RequestHandler } from "express";
import multer from "multer";
import { logger } from "./logger";

export function handleMulter(middleware: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    middleware(req, res, (err: any) => {
      if (!err) return next();

      const isMulterErr = err instanceof multer.MulterError;
      const status = isMulterErr ? 400 : 500;
      const message = isMulterErr ? err.message : "File upload error";

      logger.error({
        message: `${isMulterErr ? "Multer" : "Unknown"} error: ${err.message}`,
        timestamp: new Date().toISOString(),
      });

      return res.status(status).json({ error: message });
    });
  };
}
