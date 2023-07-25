import React from "react";
import CardImg, { CardImgProps } from "./CardImg";
//import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
//import { selectCard, deselectCard } from "../../../state/setTable";
import { Color, Shape, Shading, Quantity } from "../gameLogic/types";

export interface SetCardProps extends CardImgProps {
  id: number | string;
  quantity: Quantity;
}

function SetCard({ color, shape, quantity, shade, id }: SetCardProps) {
  //const dispatch = useDispatch();

  //const { selectedCards } = useSelector((state) => state.setTable);
  //const { hint } = useSelector((state) => state.singlePlayer);

  // const isHinted = hint.includes(id) ? true : false;

  let cardImgs = [];
  for (let i = 1; i <= quantity; i++) {
    cardImgs.push(
      <CardImg key={i} color={color} shape={shape} shade={shade} />
    );
  }
  const selected = false;
  //selectedCards.includes(id) ? true : false;

  const handleClick = () => {
    if (selected) {
      // dispatch(deselectCard(id));
    } else {
      // if (selectedCards.length === 3) return;
      // dispatch(selectCard(id));
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-light text-black m-1 p-1 rounded-md shadow-md h-24 border-4 cursor-pointer animate-card-fly-in
      flex 
      ${
        selected
          ? "border-blue-500"
          : false // isHinted
          ? " border-multiplayer700"
          : "border-light"
      }`}
    >
      <div className="flex-1"></div>
      {cardImgs}
      <div className="flex-1"></div>
    </div>
  );
}

export default SetCard;
