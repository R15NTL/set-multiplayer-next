import React, { useState } from "react";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Auth
import AuthGuard from "@/features/auth/AuthGuard";
// Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// Features
import ManageAccount from "@/features/account/ManageAccount";
import ChangePassword from "@/features/account/ChangePassword";
// Services
import { useGetAccount } from "@/services/queries/account";

Account.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>{page}</AuthGuard>
  </MainLayout>
);

export default function Account() {
  const [tab, setTab] = useState("account");

  const handleTabChange = (value: string) => setTab(value);

  return (
    <div className="m-auto w-full max-w-md">
      <Tabs
        defaultValue="account"
        className="w-full"
        value={tab}
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ManageAccount />
        </TabsContent>
        <TabsContent value="password">
          <ChangePassword handleTabChange={handleTabChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
