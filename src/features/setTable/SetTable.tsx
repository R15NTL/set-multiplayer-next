import React from "react";
//import { useSelector } from "react-redux";
import SetCard from "./SetCard";
import { Color, Shape, Shading, Quantity } from "../gameLogic/types";

export interface SetTableProps {
  data:
    | null
    | undefined
    | {
        color: Color;
        shape: Shape;
        shade: Shading;
        quantity: Quantity;
        arrId: number;
      }[];
}

function SetTable({ data }: SetTableProps) {
  if (!data) return null;

  const setCards = data.map((card, index) => {
    return (
      <SetCard
        key={card.arrId}
        id={index}
        color={card.color}
        quantity={card.quantity}
        shape={card.shape}
        shade={card.shade}
      />
    );
  });
  return <div className="grid grid-cols-3">{setCards}</div>;
}

export default SetTable;
