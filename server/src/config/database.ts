import mongoose from "mongoose"
import { logger } from "../helper/logger";


export async function connectToDB() {
  try {
    const URL = process.env.MONGO_URI;
    if (!URL)
      return logger.log({ level: "error", message: "No Mongo URI Found" })
    await mongoose.connect(URL);
    logger.log({
      level: "info",
      message: "DB Connection Successful",
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: `DB Connection Failed`,
      error: error,
    });
  }
}
