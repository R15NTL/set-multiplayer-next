import React from "react";
import Link, { LinkProps } from "next/link";
// Local
import ButtonContained, { ButtonContainedProps } from "./ButtonContained";
import ButtonBase from "./ButtonBase";
import ButtonGhost from "./ButtonGhost";

export interface ButtonProps extends ButtonContainedProps {
  href?: LinkProps["href"];
  variant?: "contained" | "outlined" | "ghost";
}

export default function Button({
  href,
  variant = "contained",
  ...other
}: ButtonProps) {
  const renderButton = () => {
    if (variant === "ghost") return <ButtonGhost {...other} />;
    if (variant === "outlined")
      return <ButtonBase tabIndex={href ? -1 : other.tabIndex} {...other} />;
    return <ButtonContained tabIndex={href ? -1 : other.tabIndex} {...other} />;
  };

  if (href) return <Link href={href}>{renderButton()}</Link>;
  return <>{renderButton()}</>;
}
