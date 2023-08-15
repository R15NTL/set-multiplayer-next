import React from "react";
// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Local
import { useSinglePlayer } from "./SinglePlayerGameProvider";
// Utils
import { formatTimeFromSeconds } from "@/utils";

export default function EndOfGame() {
  const { gameTimer } = useSinglePlayer();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Well done!</CardTitle>
        <CardDescription>
          Please sign in to view your high scores
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-5 grid">
        <div className="text-center grid text-xl">
          <h6>Time</h6>
          <p className="">{formatTimeFromSeconds(gameTimer)}</p>
        </div>

        <Card>
          <Table>
            <TableCaption>High scores</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="w-[100px]">Hints</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                <TableRow>
                  <TableCell className="font-medium">--</TableCell>
                  <TableCell className="">--</TableCell>
                  <TableCell className="text-right">--</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Card>
      </CardContent>
    </Card>
  );
}
