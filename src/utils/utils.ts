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

export const formatTimeFromSeconds = (seconds?: number | null) => {
  if (!seconds) return "00:00";

  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  // Pad start format
  const padStart = (value: number) => value.toString().padStart(2, "0");
  return `${padStart(mm)}:${padStart(ss)}`;
};
