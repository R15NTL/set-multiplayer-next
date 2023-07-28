import React from "react";
// Features
import InGame from "./InGame/InGame";
import EndOfGame from "./EndOfGame/EndOfGame";
// Socket
import { useSocket } from "@/hooks/useSocket";

export default function GameRoom() {
  const { currentRoom } = useSocket();

  if (currentRoom?.game_state?.endOfGame) return <EndOfGame />;
  return <InGame />;
}
