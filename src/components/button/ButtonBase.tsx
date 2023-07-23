import React, { useState, useRef } from "react";
import ButtonRipple from "./ButtonRipple";
import { Icon } from "@iconify/react";

export interface ButtonBaseProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

export default function ButtonBase({
  className,
  children,
  disabled,
  loading,
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
      disabled={disabled === true || loading === true}
      ref={buttonContainerRef}
      onClick={handleClick}
      className={`
      relative overflow-hidden
      py-2 px-3 text-sm font-medium 
       text-center
rounded-md
outline -outline-offset-1 outline-slate-50/50
 shadow-xl 
 transition-all duration-300 ease-in-out
  ${className} ${disabled && "bg-slate-400 hover:bg-slate-400"}`}
      {...other}
    >
      <span className="relative z-10">{children}</span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-400 z-10">
          <Icon icon="svg-spinners:ring-resize" />
        </div>
      )}
      <ButtonRipple
        clickEvent={clickEvent}
        container={buttonContainerRef.current}
      />
    </button>
  );
}
