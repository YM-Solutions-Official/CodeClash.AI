import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";
import { verifyToken } from "../lib/jwt";

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decoded = await verifyToken(token);
      const user = await UserModel.findById(decoded.userId);

      if (user) {
        req.userId = user._id;
        req.isGuest = user.isGuest;
      }
    }
    next();
  } catch (error) {
    next();
  }
};

export const requiredAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({
        error: "Authentication Required",
        needsAuth: true,
      });

    const decoded = await verifyToken(token);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: "User not found",
        needsAuth: true,
      });
    }

    if (user.isGuest) {
      return res.status(403).json({
        error: "This feature requires a full account",
        needsAuth: true,
        isGuest: true,
      });
    }

    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid token",
      needsAuth: true,
    });
  }
};
