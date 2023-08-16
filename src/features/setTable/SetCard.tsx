import React from "react";
import CardImg, { CardImgProps } from "./CardImg";
import { Quantity } from "../gameLogic/types";
import { cn } from "@/lib/utils";

export interface SetCardProps extends CardImgProps {
  index: number;
  quantity: Quantity;
  selectedCards: number[];
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>;
  cardHighlightColor?: "default" | "green" | "red";
}

function SetCard({
  color,
  shape,
  quantity,
  shade,
  index,
  selectedCards,
  setSelectedCards,
  cardHighlightColor = "default",
}: SetCardProps) {
  const cardImgs = [];

  for (let i = 1; i <= quantity; i++) {
    cardImgs.push(
      <CardImg key={i} color={color} shape={shape} shade={shade} />
    );
  }
  const selected = selectedCards.includes(index);

  const handleClick = () => {
    setSelectedCards((prev) => {
      if (prev.includes(index)) {
        return prev.filter((card) => card !== index);
      }
      if (prev.length === 3) return prev;
      return [...prev, index];
    });
  };

  return (
    <button
      onMouseDown={handleClick}
      className={cn(
        `bg-foreground text-black py-2 rounded-sm shadow-md  border-4 cursor-pointer aspect-[16/9]
      flex gap-[2%] border-foreground`,
        selected && "opacity-90",
        selected && cardHighlightColor === "default" && "border-blue-500",
        selected && cardHighlightColor === "green" && "border-emerald-500",
        selected && cardHighlightColor === "red" && "border-rose-500"
      )}
    >
      <div className="flex-1"></div>
      {cardImgs}
      <div className="flex-1"></div>
    </button>
  );
}

export default SetCard;
