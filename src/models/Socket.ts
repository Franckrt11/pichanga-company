import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/src/utils/Constants";

export let socket: Socket | null = null;

export const initSockets = () => {
  socket = io(SOCKET_URL, {
    transports: ["websocket"],
  });
};
