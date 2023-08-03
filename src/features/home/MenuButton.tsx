import React, { Fragment } from "react";
import Link, { LinkProps } from "next/link";
import { ButtonProps, Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";

interface MenuButtonProps extends ButtonProps {
  title?: string;
  href: LinkProps["href"];
}

export default function MenuButton({
  title,
  className,
  children,
  href,
  ...other
}: MenuButtonProps) {
  return (
    <Button
      {...other}
      href={href}
      className={cn("rounded-tl-3xl rounded-br-3xl h-auto", className)}
    >
      <div className="flex justify-between gap-3 px-2 text-2xl text-left items-center py-3 w-full">
        <p>{title}</p>
        {children}
      </div>
    </Button>
  );
}
