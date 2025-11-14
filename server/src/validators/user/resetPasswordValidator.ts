import { Request, Response, NextFunction } from "express";
import { logger } from "../../helper/logger";
import { failureTemplate } from "../../helper/template";
import { ComparePassword } from "../../config/bcrypt";
import { UserModel } from "../../models/user";

export async function resetPasswordValidation(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

  const { oldPassword, newPassword } = req.body;

  if ((!oldPassword || !newPassword)) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(400, "invalid request body")),
    });
    return res
      .status(400)
      .json(failureTemplate(400, "invalid request body"));
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if (!passwordRegex.test(oldPassword) || !passwordRegex.test(newPassword)) {
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
  if (newPassword === oldPassword) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(
        400,
        "New Password cannot be same as Old Password"
      )),
    });
    return res
      .status(400)
      .json(
        failureTemplate(
          400,
          "New Password cannot be same as Old Password"
        )
      );
  }

  const findUser = await UserModel.findById(user._id);

  if (!findUser) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(400, "User not found")),
    });
    return res.json(failureTemplate(400, "User not found"));
  }

  const storeHash = findUser.password;

  const checkUser = await ComparePassword(oldPassword, storeHash);

  if (checkUser == false) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(400, "Invalid old password")),
    });

    return res
      .status(400)
      .json(failureTemplate(400, "Invalid old password"));
  }

  next();
}
