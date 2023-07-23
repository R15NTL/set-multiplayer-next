import React from "react";
import Link, { LinkProps } from "next/link";
// Local
import ButtonContained, { ButtonContainedProps } from "./ButtonContained";
import ButtonBase from "./ButtonBase";

export interface ButtonProps extends ButtonContainedProps {
  href?: LinkProps["href"];
  variant?: "contained" | "outlined";
}

export default function Button({
  href,
  variant = "contained",
  ...other
}: ButtonProps) {
  const renderButton = () => {
    if (variant === "outlined")
      return <ButtonBase tabIndex={href ? -1 : other.tabIndex} {...other} />;
    return <ButtonContained tabIndex={href ? -1 : other.tabIndex} {...other} />;
  };

  if (href) return <Link href={href}>{renderButton()}</Link>;
  return <>{renderButton()}</>;
}
