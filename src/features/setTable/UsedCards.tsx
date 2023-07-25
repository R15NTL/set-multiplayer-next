import React from "react";

function UsedCards() {
  const usedCards = 12;
  const cardStack = 81 - usedCards;
  return (
    <div className="flex">
      <div className=" relative inline-block w-6 h-8 mt-1">
        <div className="w-6 h-8 border border-light rounded-sm absolute bottom-1 left-1 rotate-6 "></div>
        <div className="w-6 h-8 border absolute border-light rounded-sm bg-slate-700 flex">
          <div className="my-auto mx-auto  text-sm">{cardStack}</div>
        </div>
      </div>
    </div>
  );
}

export default UsedCards;
