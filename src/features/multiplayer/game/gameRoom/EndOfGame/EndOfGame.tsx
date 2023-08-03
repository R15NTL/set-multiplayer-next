import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
// Icons
import { Icon } from "@iconify/react";
// Features
import EndOfGamePlayerCard from "./EndOfGamePlayerCard";
import JoinRequests from "../../../components/JoinRequests";
import StartNewRound from "./StartNewRound";
import FunctionBar from "../common/FunctionBar";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
// Utils
import { getPlayerStatus } from "@/utils";
// Services
import { useGetAccount } from "@/services/queries/account";

export default function EndOfGame() {
  const { currentRoom, socket, isHost } = useSocket();
  const { data: account } = useGetAccount();

  const sortedPlayers =
    currentRoom?.room_players?.sort((a, b) => {
      if (a.score === b.score)
        return a.user.username.localeCompare(b.user.username);

      return b.score - a.score;
    }) ?? [];

  const playersInGame =
    currentRoom?.room_players?.filter((player) => player.status === "player") ??
    [];

  const newRoundIn5Seconds =
    playersInGame.length > 1 && currentRoom?.game_type === "knockout";

  const winner =
    currentRoom?.game_type === "knockout" && !newRoundIn5Seconds
      ? sortedPlayers[0]
      : null;
  const winnerIsMe =
    winner && account && winner.user.user_id === account.user_id;

  return (
    <>
      <div className="m-auto grid gap-3 w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Well done!</CardTitle>
            {winner && (
              <CardDescription>
                {winnerIsMe ? "You" : winner.user.username} won the game!
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="grid gap-3">
            {sortedPlayers.map((player, index) => (
              <EndOfGamePlayerCard key={player.user.user_id} player={player} />
            ))}
            {newRoundIn5Seconds && "New round in 5 seconds"}
          </CardContent>
          <CardFooter className="justify-end gap-3">
            {isHost && (
              <>
                <JoinRequests />
                {!newRoundIn5Seconds && <StartNewRound />}
              </>
            )}
          </CardFooter>
        </Card>
        <FunctionBar handleFindTestSet={() => {}} />
      </div>
    </>
  );
}
