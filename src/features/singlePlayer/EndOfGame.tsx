import React, { useEffect } from "react";
// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Local
import { useSinglePlayer } from "./SinglePlayerGameProvider";
// Utils
import { formatTimeFromSeconds } from "@/utils";

const HIGH_SCORE_KEY = "high-score-v1";

const getHighScore = (): number | null => {
  const localScore = localStorage.getItem(HIGH_SCORE_KEY);

  if (!localScore) return null;

  const parsedScore = parseInt(localScore);

  if (isNaN(parsedScore)) return null;

  return parsedScore;
};

const setHighScores = (score: number) =>
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(score));

export default function EndOfGame() {
  const { gameTimer, gameState, startGame } = useSinglePlayer();

  const [highScoreShown, setHighScoreShown] = React.useState<number | null>(
    null
  );
  const [prevHighScore, setPrevHighScore] = React.useState<number | null>(null);
  const [isHighScore, setIsHighScore] = React.useState<boolean>(false);

  useEffect(() => {
    if (!gameState?.endOfGame || !gameTimer) return;
    const currentHighScore = getHighScore();

    if (!currentHighScore || gameTimer < currentHighScore) {
      setPrevHighScore(currentHighScore);
      setHighScores(gameTimer);
      setIsHighScore(true);
    }

    setHighScoreShown(getHighScore());
  }, []);

  const handleStartGame = () => startGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Well done!</CardTitle>
        {isHighScore && <CardDescription>You got a best time!</CardDescription>}
      </CardHeader>
      <CardContent className="gap-5 grid">
        <Card className="text-center grid text-xl p-5 font-medium">
          <h6>Time</h6>
          <p className="">{formatTimeFromSeconds(gameTimer)}</p>
        </Card>

        <div className="grid gap-1 text-sm">
          <p className="">
            <span className={`${isHighScore ? "text-primary" : "text-muted"}`}>
              Best time:
            </span>{" "}
            <span className={`${isHighScore ? "text-primary" : ""}`}>
              {formatTimeFromSeconds(highScoreShown)}
            </span>
          </p>

          {!!prevHighScore && (
            <p className="">
              <span className="text-muted">Previous Best time:</span>{" "}
              <span>{formatTimeFromSeconds(prevHighScore)}</span>
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleStartGame} className="w-full sm:w-auto">
          Start new game
        </Button>
      </CardFooter>
    </Card>
  );
}
