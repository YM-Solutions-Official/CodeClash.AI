import { config } from "dotenv";
import nodemailer from "nodemailer";
import { otpTemplate } from "../utils/otpTemplate";
import { logger } from "./logger";

config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER?.trim(),
    pass: process.env.GMAIL_PASS?.trim(),
  },
});

export async function shipOTP(otp: string, receiver: string, type: string) {
  if (type == "email") {
    const info = await transporter.sendMail({
      from: `"CodeClash" <${process.env.GMAIL_USER}>`,
      to: receiver,
      subject: "🔒 OTP Verification for Password Reset",
      html: otpTemplate({
        otp,
        title: "OTP Verification for Password Reset",
        message:
          "We've received a request to reset your password. Use the OTP below to proceed:",
      }),
    });

    logger.log({
      level: "info",
      message: "OTP on mail sent Successfully",
      messageId: info.messageId,
    });
  } else if (type == "mobile") {
    logger.log({
      level: "info",
      message: "OTP on mobile service under construction",
    });
  }
}
