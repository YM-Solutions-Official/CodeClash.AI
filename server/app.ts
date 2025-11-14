import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// imports
import { logger } from "./src/helper/logger";
import { connectToDB } from "./src/config/database";
import { otpRouter } from "./src/routes/otpRouter";
import { authRouter } from "./src/routes/authRouter";
import { userRouter } from "./src/routes/userRouter";
import { serverListenMessage } from "./src/helper/serverListenMessage";

const app = express();

// configuring dotenv in main file to use it across all over the project
dotenv.config();
logger.log({
  level: "info",
  message: `Environment variables loaded from .env file`,
  timestamp: new Date().toISOString(),
});

// Allow all origins (dev mode)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
logger.log({
  level: "info",
  message: `CORS configured to allow requests from ${process.env.CLIENT_URL}`,
  timestamp: new Date().toISOString(),
});

// some middleware for data transfers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
logger.log({
  level: "info",
  message: `Middleware for Cookie Parsing, JSON, and URL-encoded data configured`,
  timestamp: new Date().toISOString(),
});

// statically hosting uploads folder
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  return res.end("Server Running....")
})

connectToDB()

//routes ------------------------->
//auth routes
app.use("/api/auth", authRouter);
//user routes
app.use("/api/user", userRouter);
// otp routes
app.use("/api/otp", otpRouter);


app.listen(process.env.PORT, () => {
  serverListenMessage();
  logger.log({
    level: "info",
    message: `Server Running Fine at ${process.env.ORIGIN_URL}`,
  });
});