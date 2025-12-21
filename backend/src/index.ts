import express, { Response } from "express";
import http from "http";
import { Server as SockerServer } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./lib/db";
import router from "./controller";
import healthRouter from "./controller/health";
import { setupRoomSockets } from "./sockets";

dotenv.config();

const app = express();
const { PORT, MONGO_URI, FRONTEND_URL } = process.env;

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api", router);
app.use("/health", healthRouter);

app.get("/ping", (_, res: Response) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

async function startServer() {
  await connectToDB(MONGO_URI!);

  const server = http.createServer(app);

  const io = new SockerServer(server, {
    cors: { origin: FRONTEND_URL },
  });

  setupRoomSockets(io);

  server.listen(Number(PORT), () =>
    console.log(`Server running on port ${PORT}`)
  );
}

startServer().catch((error) => console.error(error));
