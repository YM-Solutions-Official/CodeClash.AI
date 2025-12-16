import { Router } from "express";
import { createRoom } from "../service";

const roomRouter = Router();

roomRouter.post("/", createRoom);

export default roomRouter;
