import { io } from "socket.io-client";
import { getEnv } from "@/utils";

export const socket = io(getEnv("NEXT_PUBLIC_IO_SERVER_URL"), {
  autoConnect: false,
});
