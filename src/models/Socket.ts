import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/src/utils/Constants";

// const socketEndpoint = `${SOCKET_URL}:3000`;
// const socketEndpoint = "https://r0q50n0v-3000.brs.devtunnels.ms/";
const socketEndpoint = "https://socket.tejuegounapichanga.com:3000";

export let socket: Socket | null = null;

export const initSockets = () => {
  socket = io(socketEndpoint, {
    transports: ["websocket"],
  });
};
