import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { logger } from "../../helper/logger";
import { successTemplate } from "../../helper/template";
import { GenerateHashPassword } from "../../config/bcrypt";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const hashPassword = await GenerateHashPassword(password);
  const newUser = await UserModel.create({
    name: name.trim(),
    email: email.trim(),
    password: hashPassword,
  });

  const savedUser = await UserModel
    .findById(newUser._id)
    .select("name email password -_id");

  logger.log({
    level: "info",
    message: JSON.stringify(successTemplate(
      201,
      `${name} User created Successfully`,
      savedUser
    )),
  });
  return res
    .status(200)
    .json(successTemplate(201, `${name} User created Successfully`, savedUser));
}
