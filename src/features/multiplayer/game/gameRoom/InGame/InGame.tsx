import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Features
import SetTable from "@/features/setTable";
import InGamePlayerCard from "./inGamePlayerCard";
import JoinRequests from "../../../components/JoinRequests";
import StatusBar from "../common/StatusBar";
import FunctionBar from "../common/FunctionBar";
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
    <div className=" w-full min-h-full mx-auto max-w-md 2xl:max-w-lg flex flex-col gap-3 xl:gap-5">
      <StatusBar />
      <div className=" flex-1">
        <SetTable
          data={currentRoom?.game_state?.setTable}
          onFindSet={handleFindSet}
        />
      </div>
      <div className="grid gap-3 xl:gap-5">
        {sortedPlayers.length > 2 && (
          <div
            className={`grid  gap-3 xl:gap-5 ${
              sortedPlayers.length > 3 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            <InGamePlayerCard player={sortedPlayers[3]} />
            <InGamePlayerCard player={sortedPlayers[2]} />
          </div>
        )}
        <div
          className={`grid  gap-3 xl:gap-5 ${
            sortedPlayers.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          <InGamePlayerCard player={sortedPlayers[0]} />
          <InGamePlayerCard player={sortedPlayers[1]} />
        </div>
        <FunctionBar handleFindTestSet={handleFindTestSet} />
      </div>
    </div>
  );
}
