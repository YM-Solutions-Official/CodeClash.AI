import { Router } from "express";
import { uploadStore } from "../helper/upload";
import { authRoute } from "../middleware/auth";
import { deleteValidation } from "../validators/user/deleteValidator";
import { updateUserValidation } from "../validators/user/updateUserValidator";
import { resetPasswordValidation } from "../validators/user/resetPasswordValidator";
import { setNewPasswordValidation } from "../validators/user/setNewPasswordValidation";
import { displayUser } from "../controllers/user/displayUserProfile";
import { searchUsers } from "../controllers/user/searchUsers";
import { deleteUser } from "../controllers/user/delete";
import { updateUser } from "../controllers/user/updateUser";
import { resetPassword } from "../controllers/user/resetPassword";
import { setNewPassword } from "../controllers/user/setNewPassword";
import { handleMulter } from "../helper/uploadErrorHandler";

export const userRouter = Router();
const upload = uploadStore();

//user routes
userRouter.get("/profile/", authRoute, displayUser);
userRouter.get("/search", searchUsers);
userRouter.delete("/delete", authRoute, deleteValidation, deleteUser);
userRouter.patch(
  "/update-user",
  authRoute,
  handleMulter(
    upload.fields([
      { name: "avatar", maxCount: 1 },
    ])
  ),
  updateUserValidation,
  updateUser
);
userRouter.patch(
  "/reset-password",
  authRoute,
  resetPasswordValidation,
  resetPassword
);
userRouter.patch("/set-new-password", setNewPasswordValidation, setNewPassword);
