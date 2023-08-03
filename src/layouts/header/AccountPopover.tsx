import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
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

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

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
          <DropdownMenu>
            <DropdownMenuTrigger className="flex rounded-full outline-none">
              <Avatar>
                <AvatarFallback>
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
                <Link href={paths.account.root} passHref>
                  <DropdownMenuItem onSelect={() => {}} className="">
                    <Icon icon="tabler:settings" className="mr-2" />
                    <span>Manage account</span>
                  </DropdownMenuItem>
                </Link>

                <DialogTrigger className="w-full">
                  <DropdownMenuItem>
                    <Icon icon="tabler:logout" className="mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className=" max-w-sm">
            <DialogHeader>
              <DialogTitle>Log out?</DialogTitle>
            </DialogHeader>
            <DialogDescription>Are you ready to log out?</DialogDescription>
            <DialogFooter>
              <Button
                onClick={() => setLogoutDialogOpen(false)}
                variant="outline"
              >
                <span>Cancel</span>
              </Button>
              <Button onClick={() => signOut()}>Log out</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
