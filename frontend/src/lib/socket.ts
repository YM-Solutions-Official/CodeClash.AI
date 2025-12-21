import { getServerUrl } from "@/utils";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    const SERVER_URL = getServerUrl();
    socket = io(SERVER_URL, {
      transports: ["websocket"],
    });
  }

  return socket;
};
