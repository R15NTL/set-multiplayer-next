import React from "react";
// Local
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";

export interface ButtonContainedProps extends ButtonBaseProps {
  color?: "multiplayer" | "singleplayer" | "settings";
}

export default function ButtonContained({
  className,
  children,
  color = "multiplayer",
  ...other
}: ButtonContainedProps) {
  switch (color) {
    case "multiplayer":
      return (
        <ButtonBase
          {...other}
          className={` bg-multiplayer-mid hover:bg-multiplayer-dark outline-slate-50/50  ${className}`}
        >
          {children}
        </ButtonBase>
      );
    case "singleplayer":
      return (
        <ButtonBase
          {...other}
          className={` bg-single-player-mid hover:bg-single-player-dark outline-slate-50/50 ${className}`}
        >
          {children}
        </ButtonBase>
      );
    case "settings":
      return (
        <ButtonBase
          {...other}
          className={` bg-settings-mid hover:bg-settings-dark outline-slate-50/50 ${className}`}
        >
          {children}
        </ButtonBase>
      );
    default:
      return <ButtonBase className={`${className}`}>{children}</ButtonBase>;
  }
}
