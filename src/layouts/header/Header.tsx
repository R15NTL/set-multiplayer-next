import React from "react";
import Link from "next/link";
import { paths } from "@/routes/paths";
import { useSession, signOut } from "next-auth/react";
import AccountPopover from "./AccountPopover";
import Logo from "@/components/logo/Logo";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 h-header-height px-page-x-padding items-center flex bg-primary transition-colors duration-500">
      <Link href={paths.menu} className="flex items-center">
        <div className=" font-medium text-xl tracking-tight">
          Set Multiplayer
        </div>
      </Link>
      <div className="ml-auto flex  my-auto">
        <AccountPopover />
      </div>
    </div>
  );
}
