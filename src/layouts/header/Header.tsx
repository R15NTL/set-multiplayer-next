import React from "react";
import Link from "next/link";
import { paths } from "@/routes/paths";
import { useSession, signOut } from "next-auth/react";
import AccountPopover from "./AccountPopover";

export default function Header() {
  const { status } = useSession();
  return (
    <div className="fixed top-0 left-0 right-0 h-header-height px-page-x-padding items-center flex bg-multiplayer-mid">
      <Link href={paths.menu}>
        <div className=" font-medium">Set multiplayer</div>
      </Link>
      <div className="ml-auto flex  my-auto">
        <AccountPopover />
      </div>
    </div>
  );
}
