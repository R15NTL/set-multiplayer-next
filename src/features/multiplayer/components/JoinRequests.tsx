import React from "react";
// Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardTitle, Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";

export default function JoinRequests() {
  const { socket, isHost, currentRoom } = useSocket();

  const handleAcceptJoinRequest = (player_id: string) => {
    emitters.game.common.hostValidateJoinRequest({ player_id }, (...args) =>
      socket.emit(...args)
    );
  };
  const handleRejectJoinRequest = (player_id: string) => {
    emitters.game.common.hostRemovePlayer({ player_id }, (...args) =>
      socket.emit(...args)
    );
  };

  const JoinRequests = currentRoom?.join_requests;

  if (!isHost || !JoinRequests || JoinRequests.length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Join requests ({JoinRequests.length})</Button>
      </PopoverTrigger>
      <PopoverContent className=" w-full">
        <CardTitle className="mb-5">Join requests</CardTitle>
        <Card>
          <ScrollArea className="max-h-96">
            <Table>
              <TableBody>
                {JoinRequests.map((player) => (
                  <TableRow
                    className="focus:bg-transparent hover:bg-transparent"
                    key={player.user.user_id}
                  >
                    <TableCell>
                      <p className="text-base font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-[7rem] sm:max-w-sm">
                        {player.user.username}
                      </p>
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleRejectJoinRequest(player.user.user_id)
                        }
                      >
                        Reject
                      </Button>

                      <Button
                        size="sm"
                        onClick={() =>
                          handleAcceptJoinRequest(player.user.user_id)
                        }
                      >
                        Accept
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
