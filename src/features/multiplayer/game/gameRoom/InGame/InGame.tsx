import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/button";
// Features
import SetTable from "@/features/setTable";
import InGamePlayerCard from "./inGamePlayerCard";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
// Account
import { useGetAccount } from "@/services/queries/account";
// Gamelogic
import GameLogic from "@/features/gameLogic/gameLogic";

export default function InGame() {
  const { currentRoom, socket } = useSocket();
  const { data: account } = useGetAccount();

  const sortedPlayers =
    currentRoom?.room_players?.sort((a, b) => {
      if (a.user.user_id === account?.user_id) {
        return -1;
      }
      return a.user.username.localeCompare(b.user.username);
    }) ?? [];

  const handleAcceptJoinRequest = (player_id: string) => {
    emitters.game.common.hostValidateJoinRequest({ player_id }, (...args) =>
      socket.emit(...args)
    );
  };

  const handleFindSet = (indexes: number[]) => {
    if (currentRoom?.game_type === "competitive") {
      emitters.game.competitive.findSetCompetitive(
        { card_positions: indexes },
        (...args) => socket.emit(...args)
      );
    }
    if (currentRoom?.game_type === "knockout") {
      emitters.game.knockout.findSetKnockout(
        { card_positions: indexes },
        (...args) => socket.emit(...args)
      );
    }
  };

  const handleFindTestSet = () => {
    const gameLogic = new GameLogic(currentRoom?.game_state ?? undefined);
    handleFindSet(gameLogic.getHint());
  };
  return (
    <div className="m-auto w-full max-w-lg grid gap-5">
      <div className=" grid grid-cols-2 gap-5">
        <InGamePlayerCard player={sortedPlayers[3]} />
        <InGamePlayerCard player={sortedPlayers[1]} />
      </div>
      <Card>
        <SetTable
          data={currentRoom?.game_state?.setTable}
          onFindSet={handleFindSet}
        />
      </Card>
      <div className=" grid grid-cols-2 gap-5">
        <InGamePlayerCard player={sortedPlayers[0]} />
        <InGamePlayerCard player={sortedPlayers[2]} />
      </div>
      <Button onClick={handleFindTestSet}>Find test set</Button>
      <Card>
        {currentRoom?.join_requests.map((request) => (
          <div key={request.user.user_id}>
            <p>{request.user.username} wants to join the game</p>
            <Button
              onClick={() => handleAcceptJoinRequest(request.user.user_id)}
            >
              Accept
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
