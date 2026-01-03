import { Router } from "express";
import roomRouter from "./room";
import authRouter from "./user";

const router = Router();

router.use("/room", roomRouter);
router.use("/auth", authRouter);

export default router;
