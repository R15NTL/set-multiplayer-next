import React from "react";
// Socket
import { useSocket } from "@/hooks/useSocket";
// Icons
import { Icon } from "@iconify/react";

export default function StatusBar() {
  const { currentRoom } = useSocket();

  const roomName = currentRoom?.room_name;

  const gameType =
    currentRoom?.game_type === "competitive" ? "Competitive" : "Knockout";

  const usedCards = currentRoom?.game_state?.usedCards;
  const cardsLeft = 81 - (usedCards ?? 0);

  return (
    <div className=" flex w-full text-sm gap-2 items-center justify-between">
      <p className="font-medium sm:flex-1 overflow-hidden flex items-center">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {roomName}
        </span>
      </p>
      <p className="flex items-center gap-1 text-accent sm:flex-1 justify-center ">
        <Icon icon="tabler:user-x" />
        <span>{gameType}</span>
      </p>
      <p className="flex items-center gap-1 sm:flex-1 text-right justify-end text-md font-medium">
        <Icon icon="tabler:cards" />
        <span>{cardsLeft}</span>
      </p>
    </div>
  );
}
