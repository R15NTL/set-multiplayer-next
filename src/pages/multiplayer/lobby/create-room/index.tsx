import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/button";
import { useSocket } from "@/hooks/useSocket";
import { emitters, CreateRoomParams } from "@/services/socket/emitters";
// Services
import { useAxios } from "@/hooks/useAxios";
// Paths
import { apiRoutes, paths } from "@/routes/paths";

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
      console.log(token);

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
    <div>
      <input
        type="text"
        className="text-black"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <select
        className="text-black"
        value={gameType}
        onChange={(e) =>
          setGameType(e.target.value as CreateRoomParams["game_type"])
        }
      >
        <option value="knockout">Knockout</option>
        <option value="competitive">Competitive</option>
      </select>
      <Button onClick={handleCreateRoom}>Create</Button>
    </div>
  );
}
