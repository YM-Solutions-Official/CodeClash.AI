import { Request, Response } from "express";
import { successTemplate } from "../../helper/template";
import { UserModel } from "../../models/user";
import { logger } from "../../helper/logger";

export async function deleteUser(req: Request, res: Response) {
  const user = req.user;

  const findUser = await UserModel.findByIdAndDelete(user._id);
  logger.log({
    level: "info",
    message: JSON.stringify(successTemplate(
      201,
      `${findUser?.name} user deleted successfully`
    )),
  });
  res.clearCookie("codeclash-auth-token");
  res
    .status(201)
    .json(successTemplate(201, `${findUser?.name} user deleted successfully`));
}
