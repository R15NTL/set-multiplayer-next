import React, { createContext, useState, useEffect, useMemo } from "react";
// Socket
import { useSocket } from "@/hooks/useSocket";

export interface ChatItem {
  message_id: string;
  user_id: string;
  message: string;
}

interface RoomChatContextValue {
  messages: ChatItem[];
}

interface RoomChatProviderProps {
  children: React.ReactNode;
}

export const RoomChatContext = createContext<RoomChatContextValue | undefined>(
  undefined
);

export default function RoomChatProvider({ children }: RoomChatProviderProps) {
  const { socket } = useSocket();

  // State
  const [messages, setMessages] = useState<ChatItem[]>([]);

  // Handler
  const handleReceiveChatMessage = (message: ChatItem) => {
    // Add message to state
    setMessages((prev) => {
      // Filter out messages from the same user
      const messagesWithSameUserFilter = prev.filter(
        (m) => m.user_id !== message.user_id
      );
      return [...messagesWithSameUserFilter, message];
    });

    // Remove message after 3 seconds
    setTimeout(() => {
      setMessages((prev) =>
        prev.filter((m) => m.message_id !== message.message_id)
      );
    }, 3000);
  };

  // Listen for chat messages
  useEffect(() => {
    socket.on("receive-chat-message", handleReceiveChatMessage);
    return () => {
      socket.off("receive-chat-message", handleReceiveChatMessage);
    };
  }, []);

  // Context value
  const value = useMemo(
    () => ({
      messages,
    }),
    [messages]
  );

  return (
    <RoomChatContext.Provider value={value}>
      {children}
    </RoomChatContext.Provider>
  );
}
