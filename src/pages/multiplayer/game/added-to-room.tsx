import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "@/hooks/useSocket";
import { paths } from "@/routes/paths";
import { emitters } from "@/services/socket/emitters";

export default function addedToRoom() {
  const { replace, query } = useRouter();
  const { currentRoom, socket } = useSocket();

  useEffect(() => {
    if (currentRoom && query.room_id === currentRoom.room_id) {
      replace({
        pathname: paths.multiplayer.game.root,
      });
    } else {
      emitters.common.requestRoomData((...args) => socket.emit(...args));
    }
  }, [currentRoom]);
  return <div>added-to-room</div>;
}
