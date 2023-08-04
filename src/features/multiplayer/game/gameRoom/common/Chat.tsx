import React, { useState } from "react";
// Components
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// Icons
import { Icon } from "@iconify/react";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";

const OPTIONS = [
  "👍",
  "👏",
  "👋",
  "🤣",
  "😲",
  "😡",
  "😢",
  "😕",
  "😅",
  "🙂",
  "🙃",
  "😭",
  "😉",
  "🤪",
  "🫡",
];

export default function Chat() {
  const { socket } = useSocket();

  // State
  const [isOpen, setIsOpen] = useState(false);

  // Handler
  const handleChatOptionClick = (option: string) => {
    emitters.game.common.sendChatMessage({ message: option }, (...args) =>
      socket.emit(...args)
    );
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <Icon icon="tabler:message-circle" className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-5 gap-3">
        {OPTIONS.map((option) => (
          <Button
            key={option}
            size="icon"
            variant="outline"
            className="text-2xl"
            onClick={() => handleChatOptionClick(option)}
          >
            {option}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
