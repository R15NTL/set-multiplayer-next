import React from "react";
// Features
import SetTable from "../setTable/SetTable";
import EndOfGame from "./EndOfGame";
// Local
import { useSinglePlayer } from "./SinglePlayerGameProvider";

export default function SinglePlayerTable() {
  const { gameState, findSet, hint } = useSinglePlayer();

  if (gameState?.endOfGame) return <EndOfGame />;

  return (
    <SetTable onFindSet={findSet} data={gameState?.setTable} hint={hint} />
  );
}
