import React from "react";
import Link, { LinkProps } from "next/link";
import Button, { ButtonProps } from "../../components/button/Button";

interface MenuButtonProps extends ButtonProps {
  title?: string;
}

export default function MenuButton({
  title,
  className,
  children,
  ...other
}: MenuButtonProps) {
  return (
    <Button
      {...other}
      className=" text-2xl text-left rounded-tl-3xl rounded-br-3xl"
    >
      <div className="flex justify-between px-2">
        <p>{title}</p>
        {children}
      </div>
    </Button>
  );
}
