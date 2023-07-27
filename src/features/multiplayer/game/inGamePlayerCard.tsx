import React from "react";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// Types
import { Player } from "@/services/socket/types";
// Utils
import { getInitials } from "@/lib/utils";

interface InGamePlayerCardProps {
  player: Player | undefined;
}

export default function inGamePlayerCard({ player }: InGamePlayerCardProps) {
  return (
    <Card className="flex gap-3 p-3">
      <Avatar>
        <AvatarFallback>{getInitials(player?.user.username)}</AvatarFallback>
      </Avatar>
      <div>
        <h6 className="text-sm font-medium">{player?.user.username}</h6>
        <p className="text-sm">Score: {player?.score}</p>
      </div>
    </Card>
  );
}
