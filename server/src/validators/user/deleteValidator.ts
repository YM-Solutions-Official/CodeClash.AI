import { Request, Response, NextFunction } from "express";
import { logger } from "../../helper/logger";
import { failureTemplate } from "../../helper/template";
import { UserModel } from "../../models/user";
import { ComparePassword } from "../../config/bcrypt";

export async function deleteValidation(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const { password } = req.body;
  if (!password) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(400, "invalid request body")),
    });
    return res
      .status(400)
      .json(failureTemplate(400, "invalid request body"));
  }

  const findUser = await UserModel.findById(user._id);

  if (findUser == null) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(
        400,
        "User does not exists! kindly contact adminitrator for registration"
      )),
    });

    return res
      .status(400)
      .json(
        failureTemplate(
          400,
          "User does not exists! kindly contact adminitrator for registration"
        )
      );
  }

  const storeHash = findUser.password;

  const checkUser = await ComparePassword(password, storeHash);

  if (checkUser == false) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(400, "Invalid password")),
    });

    return res.status(400).json(failureTemplate(400, "Invalid password"));
  }

  next();
}
