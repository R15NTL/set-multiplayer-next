import { RoomSettings } from "./types";

type SocketEmitter = (event: string, ...args: any[]) => void;

export interface CreateRoomParams {
  token: string;
  room_name: string;
  game_type: "competitive" | "knockout";
  settings: RoomSettings;
}

interface JoinRoomParams {
  token: string;
  roomId: string;
}

interface StartGameParams {
  players_to_remove: string[];
}

interface HostValidateJoinRequestParams {
  player_id: string;
}

export interface StartNewRoundParams {
  game_type: CreateRoomParams["game_type"];
}

interface FindSetParams {
  card_positions: number[];
}

export const emitters = {
  lobby: {
    getRooms: (cb: SocketEmitter) => cb("get-rooms"),

    createRoom: (params: CreateRoomParams, cb: SocketEmitter) =>
      cb("create-room", params),

    joinRoom: (params: JoinRoomParams, cb: SocketEmitter) =>
      cb("join-room", params),

    startGame: (params: StartGameParams, cb: SocketEmitter) =>
      cb("start-game", params),
  },
  game: {
    common: {
      hostValidateJoinRequest: (
        params: HostValidateJoinRequestParams,
        cb: SocketEmitter
      ) => cb("host-validate-join-request", params),

      sendChatMessage: (params: { message: string }, cb: SocketEmitter) =>
        cb("send-chat-message", params),

      hostRemovePlayer: (params: { player_id: string }, cb: SocketEmitter) =>
        cb("host-remove-player", params),

      playerAcceptJoinRequest: (cb: SocketEmitter) =>
        cb("player-accept-join-request"),

      startNewRound: (params: StartNewRoundParams, cb: SocketEmitter) =>
        cb("start-new-round", params),
    },
    knockout: {
      findSetKnockout: (params: FindSetParams, cb: SocketEmitter) =>
        cb("find-set-knockout", params),
    },
    competitive: {
      findSetCompetitive: (params: FindSetParams, cb: SocketEmitter) =>
        cb("find-set-competitive", params),
    },
  },
  common: {
    leaveRoom: (cb: SocketEmitter) => cb("leave-room"),

    requestRoomData: (cb: SocketEmitter) => cb("request-room-data"),
  },
};
