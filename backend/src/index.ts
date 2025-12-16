import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDB from "./lib/db";
import router from "./controller";

dotenv.config();
const app = express();
const { PORT, MONGO_URI } = process.env;

app.use(express.json());
connectToDB(MONGO_URI!);

app.use("/api", router)

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
