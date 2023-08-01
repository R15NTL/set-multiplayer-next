import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { emitters, CreateRoomParams } from "@/services/socket/emitters";
import SocketGuard from "@/services/socket/SocketGuard";
// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// Services
import { useAxios } from "@/hooks/useAxios";
// Paths
import { apiRoutes, paths } from "@/routes/paths";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";

CreateRoom.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>
      <SocketGuard>{page}</SocketGuard>
    </AuthGuard>
  </MainLayout>
);

export default function CreateRoom() {
  const { replace } = useRouter();

  const [roomName, setRoomName] = useState("My room");
  const [gameType, setGameType] =
    useState<CreateRoomParams["game_type"]>("knockout");
  const { axiosInstance } = useAxios();

  const { socket } = useSocket();

  useEffect(() => {
    socket.on("added-to-game", (data: { room_id: string }) => {
      replace({
        pathname: paths.multiplayer.game.addedToRoom,
        query: { room_id: data.room_id },
      });
    });

    return () => {
      socket.off("added-to-game");
    };
  }, []);

  const handleCreateRoom = async () => {
    try {
      const data = await axiosInstance.get(apiRoutes.ioTokens.root);
      const token = data.data.data.data.token;

      const params: CreateRoomParams = {
        room_name: roomName,
        game_type: gameType,
        token: token,
        settings: {
          remove_from_lobby_in_game: false,
        },
      };

      emitters.lobby.createRoom(params, (...args) => socket.emit(...args));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="m-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create room</CardTitle>
        <CardDescription>Invite your friends to play with you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="room-name">Room name</Label>
        <Input
          id="room-name"
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Label htmlFor="game-type">Game type</Label>
        <RadioGroup
          id="game-type"
          value={gameType}
          onValueChange={(value: CreateRoomParams["game_type"]) =>
            setGameType(value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="knockout" value="knockout" />
            <Label htmlFor="knockout">Knockout</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="competitive" value="competitive" />
            <Label htmlFor="competitive">Competitive</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCreateRoom}>Create</Button>
      </CardFooter>
    </Card>
  );
}
