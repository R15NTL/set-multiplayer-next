import React, { useState, useRef } from "react";
import ButtonRipple from "./ButtonRipple";

export interface ButtonBaseProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export default function ButtonBase({
  className,
  children,
  onClick,
  ...other
}: ButtonBaseProps) {
  const [clickEvent, setClickEvent] =
    useState<React.MouseEvent<HTMLButtonElement> | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickEvent(e);
    onClick?.(e);
  };
  const buttonContainerRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonContainerRef}
      onClick={handleClick}
      className={`
      relative overflow-hidden
      py-2 px-3 text-sm text-left font-medium 
rounded-md
outline -outline-offset-1 outline-slate-50/50
 shadow-xl 
 transition-all duration-300 ease-in-out
  ${className}`}
      {...other}
    >
      <span className="relative z-10">{children}</span>
      <ButtonRipple
        clickEvent={clickEvent}
        container={buttonContainerRef.current}
      />
    </button>
  );
}
