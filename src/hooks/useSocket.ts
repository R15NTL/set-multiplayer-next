import { useContext } from "react";
import { SocketContext } from "@/services/socket/SocketProvider";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within the SocketProvider");

  return context;
};
