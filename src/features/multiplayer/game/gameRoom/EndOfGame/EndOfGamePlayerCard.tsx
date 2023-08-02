import React from "react";
// Components
import { Card } from "@/components/ui/card";
// Icons
import { Icon } from "@iconify/react";
// Local
import { HostChip } from "@/components/host-chip";
// Socket
import { useSocket } from "@/hooks/useSocket";
// Types
import { Player } from "@/services/socket/types";
// Utils
import { getPlayerStatus } from "@/utils";

interface EndOfGamePlayerCardProps {
  player: Player;
}

export default function EndOfGamePlayerCard({
  player,
}: EndOfGamePlayerCardProps) {
  const { currentRoom } = useSocket();
  return (
    <Card key={player.user.user_id} className="p-3 flex">
      <div>
        <h6 className="font-medium">{player.user.username}</h6>
        <p className="text-sm flex items-center mt-1">
          <Icon icon="tabler:star-filled" className="text-yellow-400 mr-1" />
          <span className="">{player?.score}</span>
        </p>
        {currentRoom?.game_type === "knockout" && (
          <p
            className={`text-sm ${
              player?.status === "player" ? "text-green-400" : "text-yellow-600"
            }`}
          >
            {player ? getPlayerStatus(player) : ""}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end ml-auto">
        <div className="grid justify-end">
          {currentRoom?.host.user_id === player.user.user_id && <HostChip />}
        </div>
      </div>
    </Card>
  );
}
