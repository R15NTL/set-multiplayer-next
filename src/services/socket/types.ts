import type { Card } from "../../features/gameLogic/types";

export interface GameSnapshot {
  cardStack: Card[];
  usedCards: number;
  setTable: Card[];
  endOfGame: boolean;
}

export type User = {
  user_id: string;
  username: string;
};

export type Player = {
  score: number;
  status: "player" | "audience" | "knocked-out";
  user: User;
};

export type JoinRequestPlayer = {
  accepted: boolean;
  user: User;
};

export interface RoomSettings {
  remove_from_lobby_in_game: boolean;
}

export type Room = {
  room_id: string;
  room_name: string;
  game_type: "knockout" | "competitive";
  room_players: Player[];
  settings: RoomSettings;
  host: User;
  game_status: "waiting-for-players" | "in-game";
  game_state: GameSnapshot | null;
  join_requests: JoinRequestPlayer[];
};

export interface ReceiveRoomsItem {
  id: string;
  name: string;
  playerCount: number;
  room_status: "waiting-for-players" | "in-game" | "full";
}
