import React, { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
import SetCard from "./SetCard";
import { Color, Shape, Shading, Quantity } from "../gameLogic/types";

export interface SetTableProps {
  onFindSet?: (indexes: number[]) => void;
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

function SetTable({ data, onFindSet }: SetTableProps) {
  if (!data) return null;
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  useEffect(() => {
    setSelectedCards([]);
  }, [data]);

  useEffect(() => {
    if (selectedCards.length === 3) onFindSet?.(selectedCards);
  }, [selectedCards]);

  const setCards = data.map((card, index) => {
    return (
      <SetCard
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        key={card.arrId}
        index={index}
        color={card.color}
        quantity={card.quantity}
        shape={card.shape}
        shade={card.shade}
      />
    );
  });
  return (
    <>
      <div className="grid grid-cols-3">{setCards}</div>
    </>
  );
}

export default SetTable;
