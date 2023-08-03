import React from "react";
import ShadedOval from "./cardImgs/ShadedOval";
import ShadedDiamond from "./cardImgs/ShadedDiamond";
import ShadedSnake from "./cardImgs/ShadedSnake";
import SolidOval from "./cardImgs/SolidOval";
import SolidSnake from "./cardImgs/SolidSnake";
import SolidDiamond from "./cardImgs/SolidDiamond";
import EmptyOval from "./cardImgs/EmptyOval";
import EmptyDiamond from "./cardImgs/EmptyDiamond";
import EmptySnake from "./cardImgs/EmptySnake";
import { cn } from "@/lib/utils";

import type { Shading, Color, Shape, Quantity } from "../gameLogic/types";

export interface CardImgProps {
  color: string;
  shape: Shape;
  shade: Shading;
  className?: string;
}

function CardImg({ color, shape, shade, className }: CardImgProps) {
  const colorStyle = () => {
    switch (color) {
      case "red":
        return "#FB463F";
      case "green":
        return "#1FA012";
      case "purple":
        return "#6C089E";
      default:
        return color;
    }
  };
  const element = () => {
    switch (shape) {
      case "oval":
        switch (shade) {
          case "solid":
            return <SolidOval />;
          case "shaded":
            return <ShadedOval />;
          case "empty":
            return <EmptyOval />;
          default:
            return "Error";
        }
      case "diamond":
        switch (shade) {
          case "solid":
            return <SolidDiamond />;
          case "shaded":
            return <ShadedDiamond />;
          case "empty":
            return <EmptyDiamond />;
          default:
            return "Error";
        }

      case "snake":
        switch (shade) {
          case "solid":
            return <SolidSnake />;
          case "shaded":
            return <ShadedSnake />;
          case "empty":
            return <EmptySnake />;
          default:
            return "Error";
        }

      default:
        return "Error";
    }
  };
  return (
    <div className={cn("m-auto h-full aspect-[1/2]")}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="500 0 1000 2000"
        style={{ fill: colorStyle() }}
      >
        <g>{element()}</g>
      </svg>
    </div>
  );
}

export default CardImg;
