import React, { createContext, useState, useEffect, useMemo } from "react";
// Socket.io
import { io, Socket } from "socket.io-client";
// Hooks
import { useAxios } from "@/hooks/useAxios";
// Types
import type { ReceiveRoomsItem, Room } from "./types";
// Routes
import { apiRoutes } from "@/routes/paths";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface SocketContextProviderValue {
  isConnected: boolean;
  lobbyRooms: ReceiveRoomsItem[];
  currentRoom: Room | null;
  errors: string[];
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}

export const SocketContext = createContext<
  SocketContextProviderValue | undefined
>(undefined);

const createSocket = (authToken: string, autoConnect: boolean) =>
  io(process.env.NEXT_PUBLIC_IO_SERVER_URL ?? "", {
    autoConnect: autoConnect,
    auth: {
      token: authToken,
    },
  });

export default function SocketProvider({ children }: SocketProviderProps) {
  const { axiosInstance } = useAxios();

  // State
  const [isConnected, setIsConnected] = useState(false);
  const [lobbyRooms, setLobbyRooms] = useState<ReceiveRoomsItem[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) return;

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
  }, [socket]);

  const connect = async () => {
    try {
      const data = await axiosInstance.get(apiRoutes.ioTokens.root);
      console.log(data);
      setSocket(createSocket("test", true));
      return true;
    } catch (error) {
      return false;
    }
  };

  const disconnect = () => {
    if (!socket) return;
    socket.disconnect();
  };

  const value = useMemo(
    () => ({
      isConnected,
      lobbyRooms,
      currentRoom,
      errors,
      socket,
      connect,
      disconnect,
    }),
    [isConnected, lobbyRooms, currentRoom, errors, socket, connect, disconnect]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
