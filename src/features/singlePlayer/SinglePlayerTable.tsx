import React from "react";
// Features
import SetTable from "../setTable/SetTable";
import EndOfGame from "./EndOfGame";
// Local
import { useSinglePlayer } from "./SinglePlayerGameProvider";

export default function SinglePlayerTable() {
  const { gameState, findSet } = useSinglePlayer();

  if (gameState?.endOfGame) return <EndOfGame />;

  return <SetTable onFindSet={findSet} data={gameState?.setTable} />;
}
