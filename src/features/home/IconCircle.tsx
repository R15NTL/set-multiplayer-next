import React from "react";
// Icons
import { Icon } from "@iconify/react";

interface IconCircleProps {
  icon?: string;
  children?: React.ReactNode;
}

export default function IconCircle({ icon, children }: IconCircleProps) {
  return (
    <div className="flex">
      <div className="rounded-full h-16 w-16 flex bg-slate-50 outline outline-slate-50/50">
        {children ??
          (!!icon && (
            <Icon icon={icon} className=" text-slate-500 h-12 w-12 m-auto " />
          ))}
      </div>
    </div>
  );
}
