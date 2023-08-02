import React from "react";
// Components
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HostChip } from "@/components/host-chip";
// Icons
import { Icon } from "@iconify/react";
// Utils
import { getInitials } from "@/lib/utils";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
// User
import { useGetAccount } from "@/services/queries/account";

interface PlayerCardProps {
  name?: string;
  id?: string;
}

export default function PlayerCard({ name, id }: PlayerCardProps) {
  const { currentRoom, isHost, socket } = useSocket();
  const { data: account } = useGetAccount();

  const isMe = account?.user_id === id;

  const handleRemovePlayer = () => {
    if (!id) return;
    emitters.game.common.hostRemovePlayer({ player_id: id }, (...args) =>
      socket.emit(...args)
    );
  };

  return (
    <Card className="flex  gap-3 p-3">
      <div className="flex gap-3  overflow-hidden items-center">
        <div className={!!id ? "" : " opacity-0"}>
          <Avatar>
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="overflow-hidden grid">
          <p className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center">
        {currentRoom?.host.user_id === id && <HostChip />}
        {isHost && !isMe && !!id && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Icon icon="mdi:account-remove" className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove player?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Are you sure you want to remove {name} from the game?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemovePlayer}>
                  Remove player
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </Card>
  );
}
