import { Router } from "express";
import roomRouter from "./room";

const router = Router();

router.use("/room", roomRouter);

export default router;
