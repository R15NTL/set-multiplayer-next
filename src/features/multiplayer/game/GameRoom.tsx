import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// Features
import SetTable from "@/features/setTable";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";

export default function GameRoom() {
  const { currentRoom, socket } = useSocket();
  return (
    <div className="m-auto w-full max-w-lg grid gap-5">
      <div className=" grid grid-cols-2 gap-5">
        <Card>
          <Avatar>
            <AvatarFallback>BC</AvatarFallback>
          </Avatar>
        </Card>
        <Card>
          <Avatar>
            <AvatarFallback>BC</AvatarFallback>
          </Avatar>
        </Card>
      </div>
      <Card>
        <SetTable data={currentRoom?.game_state?.setTable} />
      </Card>
      <div className=" grid grid-cols-2 gap-5">
        <Card>
          <Avatar>
            <AvatarFallback>BC</AvatarFallback>
          </Avatar>
        </Card>
        <Card className="flex gap-3">
          <Avatar>
            <AvatarFallback>BC</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-sm font-medium">Player 1</h6>
            <p className="text-sm">32</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
