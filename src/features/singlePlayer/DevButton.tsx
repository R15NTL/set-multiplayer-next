import React from "react";
import { Button } from "@/components/ui/button";
import GameLogic from "../gameLogic/gameLogic";
import { useSinglePlayer } from "./SinglePlayerGameProvider";

export default function DevButton() {
  const { gameState, findSet } = useSinglePlayer();

  const handleFindSet = () => {
    const gameLogic = new GameLogic(gameState ?? undefined);
    const set = gameLogic.getHint();
    findSet(set);
  };

  return (
    <Button className="fixed bottom-3 right-3" onClick={handleFindSet}>
      Find set
    </Button>
  );
}
