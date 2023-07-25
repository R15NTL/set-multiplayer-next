import React from "react";
import { useSocket } from "@/hooks/useSocket";
// Components
import { Button } from "@/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
// Routes
import { paths } from "@/routes/paths";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";

Lobby.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>{page}</AuthGuard>
  </MainLayout>
);

const MOCK_ROOMS = [
  {
    id: 1,
    name: "Room 1",
    playerCount: 2,
  },
  {
    id: 2,
    name: "Room 2",
    playerCount: 3,
  },
  {
    id: 3,
    name: "Room 3",
    playerCount: 4,
  },
  {
    id: 4,
    name: "Room 4",
    playerCount: 5,
  },
  {
    id: 5,
    name: "Room 5",
    playerCount: 6,
  },
  {
    id: 6,
    name: "Room 6",
    playerCount: 7,
  },
  {
    id: 7,
    name: "Room 7",
    playerCount: 8,
  },
  {
    id: 8,
    name: "Room 8",
    playerCount: 9,
  },
];

export default function Lobby() {
  const { lobbyRooms } = useSocket();
  return (
    <Card className="m-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>Lobby</CardTitle>
        <CardDescription>Join a room or create your own</CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="">
          <Table className="relative">
            <ScrollArea className="h-[60vh] max-h-64 rounded-lg">
              <TableHeader className=" sticky top-0 bg-border">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[150px]">Room name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>No. players</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {MOCK_ROOMS.map((room) => (
                  <TableRow key={room.id} className="cursor-pointer">
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>Waiting for players</TableCell>
                    <TableCell>{room.playerCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
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
