import React from "react";
// Components
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// Utils
import { getInitials } from "@/lib/utils";
// Socket
import { useSocket } from "@/hooks/useSocket";
// User
import { useGetAccount } from "@/services/queries/account";

interface PlayerCardProps {
  name?: string;
  id?: string;
}

export default function PlayerCard({ name, id }: PlayerCardProps) {
  const { currentRoom } = useSocket();
  const { data: account } = useGetAccount();

  const isHost = currentRoom && currentRoom.host.user_id === id;
  const isMe = account?.user_id === id;

  return (
    <Card className="flex flex-col gap-3 p-3">
      <div className={!!id ? "" : " opacity-0"}>
        <Avatar>
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-sm font-medium">{name}</p>
    </Card>
  );
}
