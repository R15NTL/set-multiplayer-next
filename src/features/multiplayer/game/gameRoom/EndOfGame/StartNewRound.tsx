import React, { useState } from "react";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters, StartNewRoundParams } from "@/services/socket/emitters";
// Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function StartNewRound() {
  const { socket, currentRoom } = useSocket();

  const [gameType, setGameType] = useState<StartNewRoundParams["game_type"]>(
    currentRoom?.game_type ?? "knockout"
  );

  const handleStartNewRound = () => {
    emitters.game.common.startNewRound(
      {
        game_type: gameType,
      },
      (...args) => socket.emit(...args)
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Start new game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start new round</DialogTitle>
        </DialogHeader>
        <DialogDescription className="grid gap-3 text-foreground pt-3">
          <Label htmlFor="game-type">Game type</Label>
          <RadioGroup
            id="game-type"
            value={gameType}
            onValueChange={(value: StartNewRoundParams["game_type"]) =>
              setGameType(value)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="knockout" value="knockout" />
              <Label htmlFor="knockout">Knockout</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="competitive" value="competitive" />
              <Label htmlFor="competitive">Competitive</Label>
            </div>
          </RadioGroup>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={handleStartNewRound}>Start new round</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
