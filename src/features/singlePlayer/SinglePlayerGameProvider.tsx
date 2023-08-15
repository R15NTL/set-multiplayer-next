import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
// Components
import { Button } from "@/components/ui/button";
// Game logic
import GameLogic, { GameSnapshot } from "../gameLogic/gameLogic";

interface SinglePlayerGameProviderProps {
  children: React.ReactNode;
}

interface SinglePlayerGameContextValue {
  startGame: () => void;
  findSet: (indexes: number[]) => void;
  gameState: GameSnapshot | null;
  gameTimer: number | null;
}

export const SinglePlayerGameContext = createContext<
  SinglePlayerGameContextValue | undefined
>(undefined);

export default function SinglePlayerGameProvider({
  children,
}: SinglePlayerGameProviderProps) {
  const [gameId, setGameId] = useState<string>(Date.now().toString());
  const [gameState, setGameState] = useState<GameSnapshot | null>(null);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [gameTimer, setGameTimer] = useState<number>(0);

  // Start game on mount and when on game ID change
  useEffect(() => {
    const gameLogic = new GameLogic();
    gameLogic.startGame();
    const snapshot = gameLogic.saveGame();
    setGameState(snapshot);
    setGameTimer(0);
    setGameStartTime(Date.now());
  }, [gameId]);

  // Game timer
  useEffect(() => {
    if (gameStartTime === null || gameState?.endOfGame) return;

    const timer = setInterval(() => {
      if (gameStartTime === null) return;

      const diff = Math.floor((Date.now() - gameStartTime) / 1000);

      if (diff > (gameTimer ?? 0)) setGameTimer(diff);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [gameStartTime, gameState]);

  // Context functions
  const startGame = () => setGameId(Date.now().toString());

  const findSet = (indexes: number[]) => {
    if (!gameState) return;

    const gameLogic = new GameLogic(gameState);
    gameLogic.findSet({
      cardIdA: indexes[0],
      cardIdB: indexes[1],
      cardIdC: indexes[2],
    });

    const snapshot = gameLogic.saveGame();
    setGameState(snapshot);
  };

  const value: SinglePlayerGameContextValue = useMemo(
    () => ({
      startGame,
      findSet,
      gameState,
      gameTimer,
    }),
    [gameState, gameTimer, startGame, findSet]
  );

  return (
    <SinglePlayerGameContext.Provider value={value}>
      {children}
    </SinglePlayerGameContext.Provider>
  );
}

export const useSinglePlayer = () => {
  const context = useContext(SinglePlayerGameContext);

  if (!context)
    throw new Error(
      "useSinglePlayer must be used within a SinglePlayerGameProvider"
    );

  return context;
};
