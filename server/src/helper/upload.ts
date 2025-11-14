import multer from "multer";
import fs from "fs"
import path from "path"
import { logger } from "./logger";

export function uploadStore() {
  const storage = multer.diskStorage({
    destination: function (_, file, cb) {
      let uploadPath;

      // choose folder based on fieldname
      if (file.fieldname === "avatar") {
        uploadPath = path.join(__dirname, "..", "uploads", "avatar");
      } else {
        uploadPath = path.join(__dirname, "..", "uploads", "others");
      }

      // ensure folder exists
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      logger.log({
        level: "info",
        message: `Uploading file to ${uploadPath}`,
        timestamp: new Date().toISOString(),
      });
      cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
      const user = req.user;
      const ext = path.extname(file.originalname).toLowerCase();

      if (file.fieldname === "avatar") {
        const imageFileName = `CodeClash-user-avatar.${user?._id}${ext}`;
        logger.log({
          level: "info",
          message: `Avatar upload initiated for user ID: ${user?._id}`,
          timestamp: new Date().toISOString(),
        });
        return cb(null, imageFileName);
      }

      // fallback for other files
      const genericFileName = `${file.fieldname}.${Date.now()}.${user?._id}${ext}`;
      logger.log({
        level: "info",
        message: `File upload initiated for user ID: ${user?._id}, field: ${file.fieldname}`,
        timestamp: new Date().toISOString(),
      });
      cb(null, genericFileName);
    },
  });

  return multer({ storage });
}
