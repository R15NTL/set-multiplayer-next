import React, { useState, useRef, Fragment } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import ButtonRipple from "../button/ButtonRipple";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex relative overflow-hidden items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "w-10 h-10 items-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      onClick,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const [clickEvent, setClickEvent] =
      useState<React.MouseEvent<HTMLButtonElement> | null>(null);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setClickEvent(e);
      onClick?.(e);
    };
    const buttonContainerRef = useRef<HTMLButtonElement>(null);

    const renderChildren = () => (
      <span>
        <span className="inset-0 absolute" ref={buttonContainerRef} />
        <span className="relative z-10 flex items-center text-center">
          {children}
        </span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center bg-slate-400 z-10">
            <Icon icon="svg-spinners:ring-resize" />
          </span>
        )}
        <ButtonRipple
          container={buttonContainerRef.current}
          clickEvent={clickEvent}
        />
      </span>
    );

    return (
      <Comp
        onClick={handleClick}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {renderChildren()}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
