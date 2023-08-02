import React from "react";
// Components
import { Badge } from "../ui/badge";
// Icon
import { Icon } from "@iconify/react";
// Utils
import { cn } from "@/lib/utils";

interface HostChipProps {
  className?: string;
  noText?: boolean;
  noIcon?: boolean;
}

export function HostChip({ className, noText, noIcon }: HostChipProps) {
  return (
    <Badge className={cn("bg-yellow-600 text-white", className)}>
      {!noIcon && <Icon icon="tabler:crown" className="w-4 h-4" />}
      {!noText && <span className="ml-1">Host</span>}
    </Badge>
  );
}
