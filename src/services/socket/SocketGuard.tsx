import React, { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/router";
import { paths } from "@/routes/paths";

interface SocketGuardProps {
  children: React.ReactNode;
}

export default function SocketGuard({ children }: SocketGuardProps) {
  const { socket } = useSocket();
  const { replace } = useRouter();

  const handleDisconnect = () => replace(paths.menu);
  const handleAddedToGame = (data: { room_id: string }) =>
    replace({
      pathname: paths.multiplayer.game.addedToRoom,
      query: { room_id: data.room_id },
    });
  const handleRemovedFromRoom = () => replace(paths.multiplayer.lobby.root);
  const handleRoomNoLongerExists = () => replace(paths.multiplayer.lobby.root);

  useEffect(() => {
    socket.on("disconnect", handleDisconnect);
    socket.on("added-to-game", handleAddedToGame);
    socket.on("removed-from-room", handleRemovedFromRoom);
    socket.on("room-no-longer-exists", handleRoomNoLongerExists);

    return () => {
      socket.off("disconnect", handleDisconnect);
      socket.off("added-to-game", handleAddedToGame);
      socket.off("removed-from-room", handleRemovedFromRoom);
      socket.off("room-no-longer-exists", handleRoomNoLongerExists);
    };
  }, []);

  return <>{children}</>;
}
