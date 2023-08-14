import React, { useState, useEffect, useMemo } from "react";
//import { useSelector } from "react-redux";
import SetCard from "./SetCard";
import { Color, Shape, Shading, Quantity } from "../gameLogic/types";
import GameLogic from "../gameLogic/gameLogic";

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
  // State
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [prevData, setPrevData] = useState("");

  // Memoized values
  const isSet = useMemo(() => {
    if (selectedCards.length !== 3 || !data) return false;

    const gameLogic = new GameLogic({
      cardStack: [],
      setTable: data,
      usedCards: 0,
      endOfGame: false,
    });

    const isSet = gameLogic.checkIfSet(
      selectedCards[0],
      selectedCards[1],
      selectedCards[2]
    );

    return isSet;
  }, [selectedCards]);

  const cardHighlightColor = useMemo(() => {
    if (selectedCards.length !== 3) return "default";

    return isSet ? "green" : "red";
  }, [selectedCards, isSet]);

  // Effects
  useEffect(() => {
    if (isSet) onFindSet?.(selectedCards);
  }, [isSet]);

  // Reset selected cards when data changes (Hook gets triggered
  // when the data updates even if the data has not changed)
  useEffect(() => {
    const dataString = JSON.stringify(data);

    if (prevData !== dataString) {
      setSelectedCards([]);

      setPrevData(dataString);
    }
  }, [data]);

  // Render
  const setCards = data?.map((card, index) => {
    return (
      <SetCard
        cardHighlightColor={cardHighlightColor}
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

  if (!data) return null;

  return (
    <>
      <div className="grid grid-cols-3 gap-1">{setCards}</div>
    </>
  );
}

export default SetTable;
