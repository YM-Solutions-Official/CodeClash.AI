import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../../helper/logger";
import { successTemplate } from "../../helper/template";

export async function login(req: Request, res: Response) {
  const user = req.user;

  //creating jwt token on successful login
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!JWT_SECRET_KEY)
    return logger.log({ level: "error", message: "JWT Secret Not Found" });
  const payload = user;
  const token = jwt.sign({ payload }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.cookie("codeclash-auth-token", token, { httpOnly: true, secure: false });
  logger.log({
    level: "info",
    message: JSON.stringify(
      successTemplate(201, `${user.name} user logged in successfully`, user)
    ),
    jwtToken: token,
  });
  res
    .status(201)
    .json(
      successTemplate(
        201,
        `${user.name} user logged in successfully`,
        user
      )
    );
}
