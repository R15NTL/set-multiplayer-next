import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { paths } from "@/routes/paths";
// Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// Utils
import { getInitials } from "@/lib/utils";
// Icons
import { Icon } from "@iconify/react";
// Services
import { useGetAccount } from "@/services/queries/account";

export default function AccountPopover() {
  const { status } = useSession();
  const { data: account } = useGetAccount();
  const { pathname } = useRouter();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isInMultiplayerGame = pathname.startsWith(paths.multiplayer.game.root);

  return (
    <>
      {status === "unauthenticated" && (
        <Button className="" variant="ghost" href={paths.auth.signIn.root}>
          Sign in
        </Button>
      )}
      {status === "authenticated" && (
        <Dialog
          open={logoutDialogOpen}
          onOpenChange={(open) => {
            setLogoutDialogOpen(open);
          }}
        >
          <DropdownMenu
            open={dropdownOpen}
            onOpenChange={(open) => setDropdownOpen(open)}
          >
            <DropdownMenuTrigger className="flex rounded-full outline-none">
              <Avatar>
                <AvatarFallback className={`${dropdownOpen && "opacity-90"}`}>
                  {getInitials(account?.username || "")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col max-w-[14rem]">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <h6 className="text-sm font-medium">{account?.username}</h6>
                  <p className="text-xs text-muted">{account?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link
                  href={paths.account.root}
                  target={isInMultiplayerGame ? "_blank" : ""}
                  passHref
                >
                  <DropdownMenuItem className="">
                    <Icon icon="tabler:settings" className="mr-2" />
                    <span>Manage account</span>
                  </DropdownMenuItem>
                </Link>

                <DialogTrigger className="w-full">
                  <DropdownMenuItem>
                    <Icon icon="tabler:logout" className="mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className=" max-w-sm">
            <DialogHeader>
              <DialogTitle>Sign out?</DialogTitle>
            </DialogHeader>
            <DialogDescription>Are you ready to sign out?</DialogDescription>
            <DialogFooter>
              <Button
                onClick={() => setLogoutDialogOpen(false)}
                variant="outline"
              >
                <span>Cancel</span>
              </Button>
              <Button onClick={() => signOut()}>Sign out</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
