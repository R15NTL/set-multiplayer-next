import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
// Routes
import { paths } from "@/routes/paths";
// Socket.io
import { io, Socket } from "socket.io-client";
// Account
import { useGetAccount } from "../queries/account";
// Types
import type { ReceiveRoomsItem, Room } from "./types";
import { emitters } from "./emitters";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface SocketContextProviderValue {
  isHost: boolean;
  isConnected: boolean;
  lobbyRooms: ReceiveRoomsItem[];
  currentRoom: Room | null;
  errors: string[];
  socket: Socket;
  connect: () => void;
  disconnect: () => void;
}

interface RemovedFromRoomData {
  removed_by_host: boolean;
}

export const SocketContext = createContext<
  SocketContextProviderValue | undefined
>(undefined);

const socket = io(process.env.NEXT_PUBLIC_IO_SERVER_URL ?? "", {
  autoConnect: false,
  transports: ["websocket"],
});

export default function SocketProvider({ children }: SocketProviderProps) {
  const { pathname, replace } = useRouter();
  const { toast } = useToast();
  const { data: account } = useGetAccount();

  // State
  const [isConnected, setIsConnected] = useState(false);
  const [lobbyRooms, setLobbyRooms] = useState<ReceiveRoomsItem[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [joinRequest, setJoinRequest] = useState(false);

  // Handlers
  const onConnect = () => setIsConnected(true);
  const onDisconnect = () => {
    setCurrentRoom(null);
    setIsConnected(false);
    replace(paths.menu);
  };
  const onReceiveRooms = (rooms: ReceiveRoomsItem[]) => {
    setLobbyRooms(rooms);
  };
  const onReceiveRoom = (room: Room | null) => setCurrentRoom(room);
  const onReceiveError = ({ message }: { message: string }) => {
    toast({ description: message, variant: "destructive" });
  };
  const handleAddedToGame = (data: { room_id: string }) => {
    setJoinRequest(false);
    replace({
      pathname: paths.multiplayer.game.addedToRoom,
      query: { room_id: data.room_id },
    });
  };
  const handleRemovedFromRoom = (data: RemovedFromRoomData) => {
    setCurrentRoom(null);
    setJoinRequest(false);
    if (data.removed_by_host) {
      toast({
        description: "You were removed this from the room by the host",
        variant: "destructive",
      });
    }
  };
  const handleRoomNoLongerExists = () => {
    setCurrentRoom(null);
    setJoinRequest(false);
  };
  const handleAddedToJoinRequests = () => {
    setJoinRequest(true);
    replace(paths.multiplayer.lobby.joinRequest);
  };

  // --------------------EFFECTS--------------------
  // Ensure socket is only connected when in /multiplayer
  useEffect(() => {
    if (pathname.startsWith(paths.multiplayer.root) && !isConnected)
      socket.connect();
    else if (!pathname.startsWith(paths.multiplayer.root) && isConnected)
      socket.disconnect();
  }, [pathname, isConnected]);

  // Forward user to the game room if they are in game
  useEffect(() => {
    if (currentRoom && !pathname.startsWith(paths.multiplayer.game.root)) {
      setJoinRequest(false);
      replace(paths.multiplayer.game.root);
    } else if (
      !currentRoom &&
      pathname.startsWith(paths.multiplayer.game.root)
    ) {
      {
        setJoinRequest(false);
        replace(paths.multiplayer.lobby.root);
      }
    }

    if (currentRoom && !pathname.startsWith(paths.multiplayer.game.root)) {
      setJoinRequest(false);
      replace(paths.multiplayer.game.root);
    }
  }, [currentRoom === null]);

  // Join requests
  useEffect(() => {
    if (
      joinRequest &&
      !pathname.startsWith(paths.multiplayer.lobby.joinRequest)
    ) {
      setJoinRequest(false);
      emitters.common.leaveRoom((...args) => socket.emit(...args));
    }
  }, [pathname]);

  useEffect(() => {
    if (
      !joinRequest &&
      pathname.startsWith(paths.multiplayer.lobby.joinRequest)
    )
      replace(paths.multiplayer.lobby.root);
  }, [joinRequest]);

  // Socket listeners
  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive-rooms", onReceiveRooms);
    socket.on("receive-room", onReceiveRoom);
    socket.on("error", onReceiveError);
    socket.on("added-to-game", handleAddedToGame);
    socket.on("removed-from-room", handleRemovedFromRoom);
    socket.on("room-no-longer-exists", handleRoomNoLongerExists);
    socket.on("added-to-join-requests", handleAddedToJoinRequests);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-rooms", onReceiveRooms);
      socket.off("receive-room", onReceiveRoom);
      socket.off("error", onReceiveError);
      socket.off("added-to-game", handleAddedToGame);
      socket.off("removed-from-room", handleRemovedFromRoom);
      socket.off("room-no-longer-exists", handleRoomNoLongerExists);
      socket.off("added-to-join-requests", handleAddedToJoinRequests);
    };
  }, [socket]);

  // --------------------PROVIDER VALUE--------------------
  const connect = () => {
    if (isConnected) socket.disconnect();
    socket.connect();
  };

  const disconnect = () => socket.disconnect();

  // Data
  const isHost = currentRoom?.host?.user_id === account?.user_id;

  const value = {
    isHost,
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
