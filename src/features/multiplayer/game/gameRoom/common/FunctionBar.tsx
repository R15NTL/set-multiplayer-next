import React from "react";
// Components
import { Button } from "@/components/ui/button";
// Icons
import { Icon } from "@iconify/react";
// Features
import JoinRequests from "@/features/multiplayer/components/JoinRequests";
import RoomMenu from "./RoomMenu";
import Chat from "./Chat";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
// Gamelogic
import GameLogic from "@/features/gameLogic/gameLogic";

interface FunctionBarProps {
  handleFindTestSet: () => void;
}

export default function FunctionBar({ handleFindTestSet }: FunctionBarProps) {
  const { currentRoom, socket, isHost } = useSocket();
  return (
    <div className="flex gap-3 justify-between items-center">
      <div className="flex gap-3 items-center">
        <Button onClick={handleFindTestSet}>Test</Button>
        <JoinRequests />
      </div>
      <div className="flex gap-3 items-center">
        <Chat />
        <RoomMenu />
      </div>
    </div>
  );
}
