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
    <Button {...other} className="  rounded-tl-3xl rounded-br-3xl">
      <div className="flex justify-between px-2 text-2xl text-left items-center py-3">
        <p>{title}</p>
        {children}
      </div>
    </Button>
  );
}
