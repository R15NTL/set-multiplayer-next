import React, { useState, useEffect, type FC } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewGameInNSecondsProps {
  className?: string;
}

export default function NewGameInNSeconds({
  className,
}: NewGameInNSecondsProps) {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter === 0) return;
      setCounter(counter - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <Button disabled className={cn("w-full", className)}>
      {counter > 0 ? `New round starts in ${counter} seconds` : "Connecting..."}
    </Button>
  );
}
