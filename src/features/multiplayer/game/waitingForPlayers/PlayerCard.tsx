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
      <div className="grid gap-3">
        <div className={!!id ? "" : " opacity-0"}>
          <Avatar>
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-sm font-medium">{name}</p>
      </div>
      <div>
        {isHost && !isMe && (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>
                <Icon icon="mdi:account-remove" className="mr-2" />
                Remove
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
