import { Router } from "express";
import {
  createGuestAccount,
  loginUser,
  singupUser,
  upgradeGuestAccount,
} from "../service";

const authRouter = Router();

authRouter.post("/guest", createGuestAccount);

authRouter.post("/upgrade", upgradeGuestAccount);

authRouter.post("/signup", singupUser);

authRouter.post("/login", loginUser);

export default authRouter;
