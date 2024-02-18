import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAccount } from "@/services/mutations/account";
import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";
import { buttonVariants } from "@/components/ui/button";

export function DeleteAccount() {
  const { mutate: deleteAccount, isLoading: isDeletingAccount } =
    useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="px-0">
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDeleteAccount} loading={isDeletingAccount}>
              <Icon icon="tabler:trash" className="w-4 h-4 mr-2" />
              Delete account
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
