import { Request, Response } from "express";
import { GenerateHashPassword } from "../../config/bcrypt";
import { UserModel } from "../../models/user";
import { logger } from "../../helper/logger";
import { successTemplate } from "../../helper/template";

export async function setNewPassword(req: Request, res: Response) {
  const { user, newPassword } = req.details;

  try {
    const hashedPassword = await GenerateHashPassword(newPassword);

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
      { new: true }
    );

    if (updatedUser) {
      res.clearCookie("codeclash-auth-token");
      logger.log({
        level: "info",
        message: JSON.stringify(successTemplate(
          201,
          `${updatedUser.name} user password reseted successfully`
        )),
      });

      return res
        .status(200)
        .json(
          successTemplate(
            201,
            `${updatedUser.name} user password reseted successfully`
          )
        );
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `Failed to update user password: ${error}`,
    });
    return res.status(500).json({
      status: 500,
      message: "Failed to update user password.",
    });
  }
}
