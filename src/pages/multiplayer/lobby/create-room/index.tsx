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
import { useGetAccount } from "@/services/queries/account";
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
  const { data: account } = useGetAccount();

  const [roomName, setRoomName] = useState(
    `${account?.username ?? "Unknown"}'s room`
  );
  const [gameType, setGameType] =
    useState<CreateRoomParams["game_type"]>("competitive");
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
      <CardContent className=" grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="room-name">Room name</Label>
          <Input
            id="room-name"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="game-type">Game mode</Label>
          <RadioGroup
            className="grid  pb-2 gap-3 "
            id="game-type"
            value={gameType}
            onValueChange={(value: CreateRoomParams["game_type"]) =>
              setGameType(value)
            }
          >
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="competitive" value="competitive" />
                <Label className="font-normal" htmlFor="competitive">
                  Competitive
                </Label>
              </div>
              <p className="text-xs text-muted">
                The player with the highest points is declared the winner.
              </p>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="knockout" value="knockout" />
                <Label className="font-normal" htmlFor="knockout">
                  Knockout
                </Label>
              </div>

              <p className="text-xs text-muted">
                The player with the lowest points is eliminated from the game
                until there is one player left in the game who will be declared
                the winner.
              </p>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleCreateRoom}>Create</Button>
      </CardFooter>
    </Card>
  );
}
