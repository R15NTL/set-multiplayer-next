import React, { createContext, useState, useEffect, useMemo } from "react";
// Socket.io
import { io, Socket } from "socket.io-client";
// Types
import type { ReceiveRoomsItem, Room } from "./types";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface SocketContextProviderValue {
  isConnected: boolean;
  lobbyRooms: ReceiveRoomsItem[];
  currentRoom: Room | null;
  errors: string[];
  socket: Socket;
  connect: () => void;
  disconnect: () => void;
}

export const SocketContext = createContext<
  SocketContextProviderValue | undefined
>(undefined);

const socket = io(process.env.NEXT_PUBLIC_IO_SERVER_URL ?? "", {
  autoConnect: true,
  transports: ["websocket"],
});

export default function SocketProvider({ children }: SocketProviderProps) {
  // State
  const [isConnected, setIsConnected] = useState(false);
  const [lobbyRooms, setLobbyRooms] = useState<ReceiveRoomsItem[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onReceiveRooms = (rooms: ReceiveRoomsItem[]) => setLobbyRooms(rooms);
    const onReceiveRoom = (room: Room | null) => setCurrentRoom(room);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive-rooms", onReceiveRooms);
    socket.on("receive-room", onReceiveRoom);
    socket.on("error", (error: string) => {
      console.error(error);
      setErrors((errors) => [...errors, error]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-rooms", onReceiveRooms);
      socket.off("receive-room", onReceiveRoom);
      socket.off("error");
    };
  }, [socket]);

  const connect = () => {
    if (isConnected) socket.disconnect();
    socket.connect();
  };

  const disconnect = () => socket.disconnect();

  const value = {
    isConnected,
    lobbyRooms,
    currentRoom,
    errors,
    socket,
    connect,
    disconnect,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
