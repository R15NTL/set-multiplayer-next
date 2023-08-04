import React from "react";
// Utils
import { cn } from "@/lib/utils";
// Hooks
import { useRoomChat } from "@/hooks/useRoomChat";
// Icons
import { Icon } from "@iconify/react";

interface ChatReceiverProps {
  userId: string;
  className?: string;
}

export default function ChatReceiver({ userId, className }: ChatReceiverProps) {
  const { messages } = useRoomChat();

  const message = messages.find((message) => message.user_id === userId);

  if (!message) return null;
  return (
    <div className={cn("", className)}>
      <div className="relative h-10 w-10">
        <Icon
          icon="tabler:message-circle-2-filled"
          className="absolute w-10 h-10"
        />
        <div className="px-3 py-1 text-black relative w-10 h-10 flex items-center text-center">
          <p className="text-md">{message.message}</p>
        </div>
      </div>
    </div>
  );
}
