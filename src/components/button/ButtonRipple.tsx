import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface ButtonRippleProps {
  clickEvent: React.MouseEvent<HTMLButtonElement> | null;
  container: HTMLButtonElement | null;
}

export default function ButtonRipple({
  clickEvent,
  container,
}: ButtonRippleProps) {
  if (!clickEvent) return null;
  const { clientX, clientY } = clickEvent;

  const { left, top, size } = useMemo(() => {
    if (!container) return { left: 0, top: 0, size: 0 };
    const { left, top, width } = container.getBoundingClientRect();
    const size = width * 1.5;
    const posLeft = clientX - left - size / 2;
    const posTop = clientY - top - size / 2;

    return {
      left: posLeft,
      top: posTop,
      size: size,
    };
  }, [clickEvent]);

  return (
    <motion.span
      key={clickEvent.timeStamp}
      className="h-16 w-16 bg-slate-50 rounded-full"
      style={{
        left,
        top,
        width: size,
        height: size,
        position: "absolute",
      }}
      animate={{
        scale: [0, 0.4, 0.6, 1],
        opacity: [0.7, 0],
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    />
  );
}
