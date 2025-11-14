import { Request, Response, NextFunction } from "express";
import { logger } from "../../helper/logger";
import { failureTemplate } from "../../helper/template";
import { UserModel } from "../../models/user";

export async function setNewPasswordValidation(req:Request, res:Response, next:NextFunction) {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(
        400,
        "Invalid request body: resetToken and newPassword are required."
      )),
    });
    return res
      .status(400)
      .json(
        failureTemplate(
          400,
          "Invalid request body: resetToken and newPassword are required."
        )
      );
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(
        400,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
      )),
    });
    return res
      .status(400)
      .json(
        failureTemplate(
          400,
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
        )
      );
  }

  const findUser = await UserModel.findOne({
    resetToken: resetToken,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!findUser) {
    logger.log({
      level: "info",
      message: "Invalid or expired token provided for password reset.",
    });
    return res
      .status(400)
      .json({ status: 400, message: "Invalid or expired token." });
  }

  req.details = {
    user: findUser,
    newPassword: newPassword,
  };

  next();
}
