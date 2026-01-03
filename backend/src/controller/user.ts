import { Router } from "express";
import {
  getMyInfo,
  createGuestAccount,
  loginUser,
  singupUser,
  upgradeGuestAccount,
} from "../service";

const authRouter = Router();

authRouter.get("/me", getMyInfo);

authRouter.post("/guest", createGuestAccount);

authRouter.post("/upgrade", upgradeGuestAccount);

authRouter.post("/signup", singupUser);

authRouter.post("/login", loginUser);

export default authRouter;
