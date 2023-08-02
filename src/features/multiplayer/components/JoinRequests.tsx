import React from "react";
// Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";

export default function JoinRequests() {
  const { socket, isHost, currentRoom } = useSocket();

  const handleAcceptJoinRequest = (player_id: string) => {
    emitters.game.common.hostValidateJoinRequest({ player_id }, (...args) =>
      socket.emit(...args)
    );
  };
  const handleRejectJoinRequest = (player_id: string) => {
    emitters.game.common.hostRemovePlayer({ player_id }, (...args) =>
      socket.emit(...args)
    );
  };

  const JoinRequests = currentRoom?.join_requests;

  if (!isHost || !JoinRequests || JoinRequests.length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Join requests ({JoinRequests.length})</Button>
      </PopoverTrigger>
      <PopoverContent>
        <h6>Join requests</h6>
        <ScrollArea className="max-h-96">
          {JoinRequests.map((player) => (
            <div
              key={player.user.user_id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div>{player.user.username}</div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleRejectJoinRequest(player.user.user_id)}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleAcceptJoinRequest(player.user.user_id)}
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
