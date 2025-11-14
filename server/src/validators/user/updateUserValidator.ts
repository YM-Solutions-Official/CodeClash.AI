import { Request, Response, NextFunction } from "express";
import { failureTemplate } from "../../helper/template";
import { allowedFields } from "../../utils/enum";
import { logger } from "../../helper/logger";
import { UserModel } from "../../models/user";
import { nameRegex, urlRegex } from "../../utils/regex";

export async function updateUserValidation(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const reqBodyData = req.body;
  const reqFileData = req.files;

  // --- Start of the corrected data parsing code ---

  // Iterate through the body keys and attempt to parse any stringified JSON
  for (const key of Object.keys(reqBodyData)) {
    try {
      // Check if the string starts with '{' or '[' to hint at JSON
      if (
        typeof reqBodyData[key] === "string" &&
        (reqBodyData[key].startsWith("{") || reqBodyData[key].startsWith("["))
      ) {
        reqBodyData[key] = JSON.parse(reqBodyData[key]);
      }
      // FIX: Prefix 'e' with an underscore to resolve the 'no-unused-vars' error.
    } catch {
      // If parsing fails, it's not a valid JSON string, so we keep the original value.
    }
  }

  // A separate step to handle nested stringified objects within arrays,
  // which can happen with `multipart/form-data`.
  const fieldsToParse = [
    "socialLinks",
    "experience",
    "education",
    "certification",
  ];

  for (const field of fieldsToParse) {
    if (reqBodyData[field] !== undefined) {
      // If the field is an array, iterate and parse its string elements
      if (Array.isArray(reqBodyData[field])) {
        reqBodyData[field] = reqBodyData[field].map((item) => {
          try {
            return typeof item === "string" ? JSON.parse(item) : item;
            // FIX: Prefix 'e' with an underscore to resolve the 'no-unused-vars' error.
          } catch {
            return item;
          }
        });
      }
      // If it's a single object (e.g., certification), and the validation expects an array,
      // wrap the object in an array to match the validation.
      else if (
        typeof reqBodyData[field] === "object" &&
        !Array.isArray(reqBodyData[field])
      ) {
        reqBodyData[field] = [reqBodyData[field]];
      }
    }
  }

  // --- End of the corrected data parsing code ---

  // checking if the request body or files are empty
  if (
    (!reqBodyData || Object.keys(reqBodyData).length === 0) &&
    !reqFileData &&
    (!reqFileData || Object.keys(reqFileData).length === 0)
  ) {
    return res
      .status(400)
      .json(failureTemplate(400, "Invalid request body: no data provided"));
  }

  const receivedFields = Object.keys(reqBodyData);
  const disallowedFields = receivedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  // check if there are some disallowed fields in the request body
  if (disallowedFields.length > 0) {
    logger.log({
      level: "error",
      message: JSON.stringify(failureTemplate(
        400,
        `Invalid fields in request body: ${disallowedFields.join(", ")}`
      )),
    });
    return res
      .status(400)
      .json(
        await failureTemplate(
          400,
          `Invalid fields in request body: ${disallowedFields.join(", ")}`
        )
      );
  }

  // Check if user exists in the database
  const findUser = await UserModel.findById(user._id);
  if (!findUser) {
    logger.log({
      level: "error",
      message: JSON.stringify(failureTemplate(
        400,
        "User does not exist! Kindly contact the administrator for registration"
      )),
    });
    return res
      .status(400)
      .json(
        failureTemplate(
          400,
          "User does not exist! Kindly contact the administrator for registration"
        )
      );
  }

  // Name
  if (reqBodyData.name !== undefined) {
    if (
      reqBodyData.name.length < 3 ||
      reqBodyData.name.length > 50 ||
      !nameRegex.test(reqBodyData.name)
    ) {
      logger.log({
        level: "error",
        message: JSON.stringify(failureTemplate(
          400,
          "Name must be 3-50 characters long and only contain letters and spaces."
        )),
      });
      return res
        .status(400)
        .json(
          failureTemplate(
            400,
            "Name must be 3-50 characters long and only contain letters and spaces."
          )
        );
    }
  }

  // Bio
  if (reqBodyData.bio !== undefined) {
    if (typeof reqBodyData.bio !== "string" || reqBodyData.bio.length > 500) {
      logger.log({
        level: "error",
        message: JSON.stringify(failureTemplate(
          400,
          "Bio cannot exceed 200 characters."
        )),
      });
      return res
        .status(400)
        .json(failureTemplate(400, "Bio cannot exceed 200 characters."));
    }
  }

  // DOB
  if (reqBodyData.dob !== undefined) {
    const date = new Date(reqBodyData.dob);
    if (isNaN(date.getTime())) {
      logger.log({
        level: "error",
        message: JSON.stringify(failureTemplate(400, "DOB must be a valid date.")),
      });
      return res
        .status(400)
        .json(failureTemplate(400, "DOB must be a valid date."));
    }
  }

  // Social Links
  if (reqBodyData.socialLinks !== undefined) {
    if (!Array.isArray(reqBodyData.socialLinks)) {
      logger.log({
        level: "error",
        message: JSON.stringify(failureTemplate(400, "Social links must be an array.")),
      });
      return res
        .status(400)
        .json(failureTemplate(400, "Social links must be an array."));
    }

    // mapping through each social link to validate
    for (const link of reqBodyData.socialLinks) {
      if (
        typeof link.platform !== "string" ||
        typeof link.url !== "string" ||
        !urlRegex.test(link.url)
      ) {
        logger.log({
          level: "error",
          message: JSON.stringify(failureTemplate(
            400,
            "Each social link must have a valid 'platform' and 'url'."
          )),
        });
        return res
          .status(400)
          .json(
            failureTemplate(
              400,
              "Each social link must have a valid 'platform' and 'url'."
            )
          );
      }
    }
  }

  logger.log({ level: "info", message: `Update User Validation Successful` });
  req.updatedBody = { ...reqBodyData, file: reqFileData };

  next();
}
