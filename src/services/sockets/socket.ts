import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_IO_SERVER_URL ?? "", {
  autoConnect: false,
});
