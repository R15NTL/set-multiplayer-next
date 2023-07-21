import React, { createContext, useState, useEffect, useMemo } from "react";
import { socket } from "./socket";
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
  connect: () => void;
  disconnect: () => void;
}

export const SocketContext = createContext<
  SocketContextProviderValue | undefined
>(undefined);

export default function SocketProvider({ children }: SocketProviderProps) {
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
    socket.on("error", (error: string) =>
      setErrors((errors) => [...errors, error])
    );

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-rooms", onReceiveRooms);
      socket.off("receive-room", onReceiveRoom);
      socket.off("error");
    };
  }, []);

  const connect = () => socket.connect();
  const disconnect = () => socket.disconnect();

  const value = useMemo(
    () => ({
      isConnected,
      lobbyRooms,
      currentRoom,
      errors,
      connect,
      disconnect,
    }),
    [isConnected, lobbyRooms, currentRoom, errors, connect, disconnect]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
