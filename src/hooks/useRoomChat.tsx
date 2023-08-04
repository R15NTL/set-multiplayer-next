import { useContext } from "react";
import { RoomChatContext } from "@/services/socket/RoomChatProvider";

export const useRoomChat = () => {
  const context = useContext(RoomChatContext);
  if (context === undefined)
    throw new Error("useRoomChat must be used within a RoomChatProvider");

  return context;
};
