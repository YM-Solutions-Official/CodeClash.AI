import { Router, Response } from "express";

const healthRouter = Router();

healthRouter.get("/ping", (_, res: Response) => {
  res.json({ message: "Backend bootup!" });
});

export default healthRouter;