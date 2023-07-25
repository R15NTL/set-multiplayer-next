import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Features
import SetTable from "@/features/setTable";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";

export default function GameRoom() {
  const { currentRoom, socket } = useSocket();
  return (
    <div className="m-auto w-full max-w-lg grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Game room</CardTitle>
          <CardDescription>Room: </CardDescription>
        </CardHeader>
        <CardContent>
          <SetTable data={currentRoom?.game_state?.setTable} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Players</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
