import React from "react";
// Features
import SetTable from "../setTable/SetTable";
// Local
import { useSinglePlayer } from "./SinglePlayerGameProvider";

export default function SinglePlayerTable() {
  const { gameState, findSet } = useSinglePlayer();

  return <SetTable onFindSet={findSet} data={gameState?.setTable} />;
}
