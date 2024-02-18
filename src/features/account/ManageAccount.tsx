import React, { useEffect, useState } from "react";
// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteAccount } from "./DeleteAccount";
// Services
import { useGetAccount } from "@/services/queries/account";
import { useUpdateAccount } from "@/services/mutations/account";
import { useDeleteAccount } from "@/services/mutations/account";

export default function ManageAccount() {
  const { data: account } = useGetAccount();
  const { mutate: updateAccount, isLoading: isUpdatingAccount } =
    useUpdateAccount();
  const { mutate: deleteAccount, isLoading: isDeletingAccount } =
    useDeleteAccount();

  const dataUsername = account?.username;

  const [username, setUsername] = useState(dataUsername);

  useEffect(() => {
    setUsername(dataUsername);
  }, [dataUsername]);

  const isValidUsername = username && username.trim().length > 0;
  const saveChangesDisabled = !isValidUsername || username === dataUsername;

  // Handlers
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveChanges = () => {
    if (!isValidUsername) return;
    updateAccount({ username: username.trim() });
  };

  return (
    <Card className="min-h-[22rem] flex flex-col">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Make changes to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Screen name</Label>
          <Input
            id="name"
            value={username ?? ""}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input disabled id="email" value={account?.email ?? ""} />
        </div>
      </CardContent>
      <CardFooter className=" flex justify-between mt-auto">
        <DeleteAccount />
        <Button
          disabled={saveChangesDisabled}
          loading={isUpdatingAccount}
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}
