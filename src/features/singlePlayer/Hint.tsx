import React, { useState, useEffect } from "react";
// Components
import { Button } from "@/components/ui/button";
// Features
import { useSinglePlayer } from "./SinglePlayerGameProvider";
// GameLogic
import GameLogic from "../gameLogic/gameLogic";

export default function Hint() {
  const { gameState, gameTimer, hint, setHint, setGameStartTime } =
    useSinglePlayer();

  // State
  const [timeOfLastChange, setTimeOfLastChange] = useState(Date.now());
  const [showHintButton, setShowHintButton] = useState(false);

  // Effects
  useEffect(() => {
    setTimeOfLastChange(Date.now());
    setHint(null);
  }, [gameState]);

  useEffect(() => {
    if (gameTimer === null || !gameState || gameState.endOfGame || hint) {
      setShowHintButton(false);
      return;
    }

    const timeNow = Date.now();
    const hasBeenNSeconds = timeNow > 1000 * 45 + timeOfLastChange;

    if (hasBeenNSeconds) setShowHintButton(true);
    else setShowHintButton(false);
  }, [gameTimer, timeOfLastChange, gameState, hint]);

  // Handlers
  const handleHint = () => {
    if (!gameState || gameState.endOfGame) return;

    const gameLogic = new GameLogic(gameState);
    const hint = gameLogic.getHint();

    // Add 15s to time
    setGameStartTime((prev) => {
      if (prev === null) return null;

      return prev - 1000 * 15;
    });
    setHint(hint);
  };

  // Render
  if (!showHintButton) return null;

  return (
    <Button onClick={handleHint} className=" fixed bottom-5 right-5">
      Hint +15s
    </Button>
  );
}
