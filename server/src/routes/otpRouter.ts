import { Router } from "express";
import { sendOtpValidation } from "../validators/otp/sendOtpValidation";
import { verifyOtpValidation } from "../validators/otp/verifyOtpValidation";
import { sendOTP } from "../controllers/otp/send-otp";
import { verifyOTP } from "../controllers/otp/verify-otp";


export const otpRouter = Router();

otpRouter.post("/send-otp", sendOtpValidation, sendOTP);
otpRouter.post("/verify-otp", verifyOtpValidation, verifyOTP);
