import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { logger } from "../../helper/logger";
import { successTemplate } from "../../helper/template";

export async function displayUser(req: Request, res: Response) {
  const user = req.user;
  const userBodyData = req.body;

  const findUser = await UserModel
    .findById(userBodyData?._id ? userBodyData?._id : user._id)
    .select("-password -updatedAt -__v");
  logger.log({
    level: "info",
    action: "user displayed successfully",
    message: JSON.stringify(successTemplate(
      201,
      "user displayed successfully",
      findUser
    )),
  });
  res
    .status(201)
    .json(successTemplate(201, "user displayed successfully", findUser));
}
