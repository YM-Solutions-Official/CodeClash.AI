import { Request, Response, NextFunction } from "express";
import { logger } from "../../helper/logger";
import { failureTemplate } from "../../helper/template";
import { UserModel } from "../../models/user";
import { OTPModel } from "../../models/otp";

const OTP_LENGTH = 6;

export async function verifyOtpValidation(req: Request, res: Response, next: NextFunction) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(
        400,
        "invalid request body: email and otp are required."
      )),
    });
    return res
      .status(400)
      .json(
        failureTemplate(
          400,
          "invalid request body: email and otp are required."
        )
      );
  }

  const emailRegex = /^[A-Za-z0-9._%+-]{6,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(400, "Enter Valid Email")),
    });
    return res
      .status(400)
      .json(failureTemplate(400, "Enter Valid Email"));
  }

  const otpRegex = new RegExp(`^\\d{${OTP_LENGTH}}$`);
  if (!otpRegex.test(otp)) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(
        400,
        `OTP must be a ${OTP_LENGTH}-digit number.`
      )),
    });
    return res
      .status(400)
      .json(
        failureTemplate(400, `OTP must be a ${OTP_LENGTH}-digit number.`)
      );
  }

  const findUser = await UserModel.findOne({ email: email });

  if (!findUser) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(
        400,
        "User does not exist! Request from Unregistered User"
      )),
    });
    return res
      .status(400)
      .json(
        await failureTemplate(
          400,
          "User does not exist! Request from Unregistered User"
        )
      );
  }

  const findOtp = await OTPModel.findOne({ email: email, otp: otp });

  if (!findOtp) {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(400, "Invalid OTP")),
    });
    return res.status(400).json(failureTemplate(400, "Invalid OTP"));
  }

  const date = new Date();
  if (findOtp.expiringTime < date || findOtp.status !== "pending") {
    logger.log({
      level: "info",
      message: JSON.stringify(failureTemplate(400, "Invalid OTP or OTP Expired")),
    });
    return res
      .status(400)
      .json(failureTemplate(400, "Invalid OTP or OTP Expired"));
  }

  logger.log({
    level: "info",
    message: `OTP Verification Validation Successful`,
  });

  req.otpDetails = findOtp;
  next();
}
