import React from "react";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// Icons
import { Icon } from "@iconify/react";
// Socket
import { useSocket } from "@/hooks/useSocket";
// Local
import { HostChip } from "@/components/host-chip";
import ChatReceiver from "../common/ChatReceiver";
// Types
import { Player } from "@/services/socket/types";
// Utils
import { getInitials } from "@/lib/utils";
import { getPlayerStatus } from "@/utils";
// Services
import { useGetAccount } from "@/services/queries/account";

interface InGamePlayerCardProps {
  player: Player | undefined;
}

export default function inGamePlayerCard({ player }: InGamePlayerCardProps) {
  const { currentRoom } = useSocket();
  const { data: account } = useGetAccount();
  const isHost = currentRoom?.host.user_id === player?.user.user_id;

  const isMe = account?.user_id === player?.user.user_id;
  return (
    <Card
      className="flex gap-2 py-2 px-3 sm:py-3 sm:gap-3 items-center"
      style={{
        visibility: player ? "visible" : "hidden",
        height: player ? "auto" : "0px",
        position: player ? "relative" : "absolute",
      }}
    >
      {player && (
        <ChatReceiver
          userId={player.user.user_id}
          className="absolute z-20 -top-5 -right-3"
        />
      )}

      <div>
        <Avatar>
          <AvatarFallback>{getInitials(player?.user.username)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="overflow-hidden">
        <h6 className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {player?.user.username}
        </h6>
        <p className="text-xs items-center flex">
          <Icon icon="tabler:star-filled" className="text-yellow-400 mr-1" />
          <span className="">{player?.score}</span>
        </p>
        {currentRoom?.game_type === "knockout" && (
          <p
            className={`text-xs ${
              player?.status === "player" ? "text-green-400" : "text-yellow-600"
            }`}
          >
            {player ? getPlayerStatus(player) : ""}
          </p>
        )}
      </div>
      {isHost && (
        <HostChip
          noIcon
          className="absolute sm:static ml-auto z-20 -bottom-1 -right-1 shadow-md"
        />
      )}
    </Card>
  );
}
