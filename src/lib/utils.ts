import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name?: string) => {
  if (!name) return "";
  const [firstName, lastName] = name.split(" ");
  return firstName[0] ?? "" + lastName[0] ?? "";
};
