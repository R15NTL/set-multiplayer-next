import React from "react";
import Link, { LinkProps } from "next/link";
// Local
import ButtonContained, { ButtonContainedProps } from "./ButtonContained";

export interface ButtonProps extends ButtonContainedProps {
  href?: LinkProps["href"];
  variant?: "contained";
}

export default function Button({
  href,
  variant = "contained",
  ...other
}: ButtonProps) {
  const renderButton = (
    <ButtonContained tabIndex={href ? -1 : other.tabIndex} {...other} />
  );

  if (href) return <Link href={href}>{renderButton}</Link>;
  return <>{renderButton}</>;
}
