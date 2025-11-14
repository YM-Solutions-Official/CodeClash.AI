import bcrypt from "bcrypt";
import { logger } from "../helper/logger";

export async function GenerateHashPassword(password: string) {
    const genSalt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password.trim(), genSalt);
    logger.log({
        level: "info",
        message: `Password encrypted successfully`,
        timestamp: new Date().toISOString(),
    });
    return encryptPassword;
}

export async function ComparePassword(password: string, storedHash: string) {
    const comparePassword = await bcrypt.compare(password.trim(), storedHash);
    logger.log({
        level: "info",
        message: `Password comparison performed`,
        timestamp: new Date().toISOString(),
    });
    return comparePassword;
}