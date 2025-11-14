import { Request, Response } from "express";
import { logger } from "../../helper/logger";

export async function verifyOTP(req: Request, res: Response) {
  const otpDbDetail = req.otpDetails;

  try {
    otpDbDetail.status = "verified";
    await otpDbDetail.save();

    logger.log({
      level: "info",
      message: "User Verified Successfully",
    });

    return res.status(200).json({
      status: 200,
      message: "OTP verified successfully.",
      data: {
        contact: otpDbDetail.email,
      },
    });

  } catch (error: any) {
    logger.log({
      level: "error",
      message: `Failed to verify OTP: ${error.message}`,
    });
    return res.status(500).json({
      status: 500,
      message: "Failed to verify OTP.",
    });
  }
}
