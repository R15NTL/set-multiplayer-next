import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "@/hooks/useSocket";
// Paths
import { paths } from "@/routes/paths";

export default function index() {
  const { replace } = useRouter();
  const { currentRoom } = useSocket();

  useEffect(() => {
    if (!currentRoom) {
      replace(paths.multiplayer.lobby.root);
    }

    if (currentRoom?.game_status === "waiting-for-players") {
      replace(paths.multiplayer.game.waitingForPlayers);
    }
  }, [currentRoom]);

  return <div>index</div>;
}
