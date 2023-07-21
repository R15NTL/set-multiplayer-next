import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "@/hooks/useSocket";
// Paths
import { paths } from "@/routes/paths";

export default function waitingForPlayers() {
  const { currentRoom } = useSocket();

  const { replace } = useRouter();

  useEffect(() => {
    if (!currentRoom) {
      replace(paths.multiplayer.lobby.root);
    }
  }, [currentRoom]);

  const hostId = currentRoom?.host.user_id;

  return (
    <div>
      <h1>Waiting for players</h1>
      <ul>
        {currentRoom?.room_players.map((player) => (
          <li key={player.user.user_id}>
            {player.user.username} {player.user.user_id === hostId && "(host)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
