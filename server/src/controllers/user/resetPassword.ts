import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { GenerateHashPassword } from "../../config/bcrypt";
import { logger } from "../../helper/logger";
import { successTemplate } from "../../helper/template";

export async function resetPassword(req:Request, res:Response) {
  const user = req.user;
  const { newPassword } = req.body;

  const resetUserPassword = await UserModel.findOneAndUpdate(
    { _id: user._id },
    { password: await GenerateHashPassword(newPassword) }
  );
  logger.log({
    level: "info",
    message: JSON.stringify(successTemplate(
      201,
      `${resetUserPassword?.name} user password updated successfully`
    )),
  });
  res.clearCookie("codeclash-auth-token");
  res
    .status(201)
    .json(
      successTemplate(
        201,
        `${resetUserPassword?.name} user password updated successfully`
      )
    );
}
