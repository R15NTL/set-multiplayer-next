import type { Player } from "@/services/socket/types";

export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
};

export const getPlayerStatus = (player: Player) => {
  switch (player?.status) {
    case "player":
      return "Player";
    case "audience":
      return "Spectator";
    case "knocked-out":
      return "Knocked out";
    default:
      return "Spectator";
  }
};
