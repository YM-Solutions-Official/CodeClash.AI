import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { allowedSocialLinks } from "../../utils/enum";
import { logger } from "../../helper/logger";
import { failureTemplate, successTemplate } from "../../helper/template";

export async function updateUser(req: Request, res: Response) {
  try {
    const user = req.user;
    const findUser = await UserModel.findById(user._id);
    const updateData = await { ...req.updatedBody };

    if (updateData.name) {
      updateData.name = updateData.name.trim();
    }
    if (updateData.bio) {
      updateData.bio = updateData.bio.trim();
    }
    if (updateData.dob) {
      const dobDate = new Date(updateData.dob);
      updateData.dob = dobDate;
    }

    // Social Links
    if (updateData.socialLinks && Array.isArray(updateData.socialLinks)) {
      const filteredLinks = [];

      for (const link of updateData.socialLinks) {
        if (
          link.platform &&
          allowedSocialLinks.includes(link.platform.toLowerCase()) &&
          link.url
        ) {
          filteredLinks.push({
            platform: link.platform.trim(),
            url: link.url.trim(),
          });
        }
      }
      updateData.socialLinks = filteredLinks;
    }

    // Avatar - Only update if a file was actually uploaded
    if (req.files?.avatar?.[0]) {
      updateData.avatar = req.files.avatar[0].filename;
    }

    // Update User Document
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    logger.log({
      level: "info",
      message: JSON.stringify(successTemplate(
        201,
        `${findUser?.name} user updated successfully`,
        updatedUser
      )),
      userAction: "user updated successfully",
    });

    return res
      .status(200)
      .json(
        successTemplate(
          201,
          `${findUser?.name} user updated successfully`,
          updatedUser
        )
      );
  } catch (error) {
    logger.log({
      level: "error",
      message: `Error in updateUser controller: ${error}`,
    });
    return res
      .status(500)
      .json(failureTemplate(500, "Internal Server Error"));
  }
}
