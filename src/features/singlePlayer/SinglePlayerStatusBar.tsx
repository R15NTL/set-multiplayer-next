import React from "react";
// Components
import { Card } from "@/components/ui/card";
// Icons
import { Icon } from "@iconify/react";
// Local
import { useSinglePlayer } from "./SinglePlayerGameProvider";

export default function SinglePlayerStatusBar() {
  const { gameState, gameTimer } = useSinglePlayer();

  const cardsLeft = gameState?.usedCards ? 81 - gameState.usedCards : "-";

  // Game timer format (mm:ss)
  const timer = React.useMemo(() => {
    if (!gameTimer) return "00:00";
    const minutes = Math.floor(gameTimer / 60);
    const seconds = gameTimer % 60;
    // Pad start format
    const padStart = (value: number) => value.toString().padStart(2, "0");
    return `${padStart(minutes)}:${padStart(seconds)}`;
  }, [gameTimer]);

  return (
    <Card className="flex p-3 items-center text-sm">
      <p className="flex-1 flex items-center">
        <Icon icon="tabler:cards" className="mr-1 w-4 h-4" />
        {cardsLeft}
      </p>
      <p className="flex-1 text-center text-xs text-muted flex items-center">
        <Icon icon="tabler:trophy" className="mr-1 w-3 h-3" />
        Single player
      </p>
      <div className="flex-1 items-center flex">
        <p className="w-10 ml-auto my-auto">{timer}</p>
      </div>
    </Card>
  );
}
