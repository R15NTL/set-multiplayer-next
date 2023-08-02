import React from "react";
import CardImg, { CardImgProps } from "./CardImg";
//import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
//import { selectCard, deselectCard } from "../../../state/setTable";
import { Color, Shape, Shading, Quantity } from "../gameLogic/types";

export interface SetCardProps extends CardImgProps {
  index: number;
  quantity: Quantity;
  selectedCards: number[];
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>;
}

function SetCard({
  color,
  shape,
  quantity,
  shade,
  index,
  selectedCards,
  setSelectedCards,
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
    <div
      onClick={handleClick}
      className={`bg-foreground text-black py-2 rounded-sm shadow-md  border-4 cursor-pointer aspect-[88/63]
      flex gap-[3%]
      ${selected ? "border-blue-500" : "border-foreground"}`}
    >
      <div className="flex-1"></div>
      {cardImgs}
      <div className="flex-1"></div>
    </div>
  );
}

export default SetCard;
