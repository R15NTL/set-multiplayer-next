import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
import SocketGuard from "@/services/socket/SocketGuard";
// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// Routes
import { paths } from "@/routes/paths";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Utils
import { cn } from "@/lib/utils";
// Types
import { ReceiveRoomsItem } from "@/services/socket/types";

Lobby.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>
      <SocketGuard>{page}</SocketGuard>
    </AuthGuard>
  </MainLayout>
);

const MOCK_ROOMS = [
  {
    id: "1",
    name: "Room 1",
    playerCount: 2,
  },
  {
    id: "2",
    name: "Room 2",
    playerCount: 3,
  },
  {
    id: "3",
    name: "Room 3",
    playerCount: 4,
  },
  {
    id: "4",
    name: "Room 4",
    playerCount: 5,
  },
  {
    id: "5",
    name: "Room 5",
    playerCount: 6,
  },
  {
    id: "6",
    name: "Room 6",
    playerCount: 7,
  },
  {
    id: "7",
    name: "Room 7",
    playerCount: 8,
  },
  {
    id: "8",
    name: "Room 8",
    playerCount: 9,
  },
];

const getRoomStatus = (status: ReceiveRoomsItem["room_status"]) => {
  switch (status) {
    case "waiting-for-players":
      return "Waiting for players";
    case "in-game":
      return "In game";
    case "full":
      return "Full";
    default:
      return "Error";
  }
};

export default function Lobby() {
  const { lobbyRooms, isConnected, socket } = useSocket();
  const { replace } = useRouter();

  useEffect(() => {
    if (isConnected) {
      emitters.lobby.getRooms((...args) => socket.emit(...args));
      emitters.common.checkIfInRoom((...args) => socket.emit(...args));
    }
  }, [isConnected]);

  const handleJoinRoom = (roomId: string) => {
    replace({
      pathname: paths.multiplayer.lobby.joinRoom.root,
      query: { room_id: roomId },
    });
  };

  return (
    <Card className="m-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>Lobby</CardTitle>
        <CardDescription>Join a room or create your own</CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="h-[40vh] max-h-[500px] overflow-y-auto">
          <Table className="">
            <TableHeader className=" sticky top-0 w-full z-20 bg-border">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[150px]">Room name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="flex items-center">
                  <span className="ml-auto">No. players</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lobbyRooms.map((room) => (
                <TableRow
                  key={room.id}
                  className="cursor-pointer"
                  onClick={() => {
                    handleJoinRoom(room.id);
                  }}
                >
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell
                    className={cn(
                      "text-xs",
                      room.room_status === "waiting-for-players" &&
                        "text-emerald-500",
                      room.room_status === "in-game" && "text-yellow-600",
                      room.room_status === "full" && "text-rose-400"
                    )}
                  >
                    {getRoomStatus(room.room_status)}
                  </TableCell>
                  <TableCell className=" text-right">
                    {room.playerCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button href={paths.multiplayer.lobby.createRoom.root}>
          Create room
        </Button>
      </CardFooter>
    </Card>
  );
}
