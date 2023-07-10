import React from "react";

export interface ButtonBaseProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export default function ButtonBase({
  className,
  children,
  ...other
}: ButtonBaseProps) {
  return (
    <button
      className={`py-2 px-3 text-sm text-left font-medium 
rounded-md
outline -outline-offset-1 outline-slate-50/50
 shadow-xl flext content-between ${className}`}
      {...other}
    >
      {children}
    </button>
  );
}
