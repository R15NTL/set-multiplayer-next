import React from "react";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Components
import { Button } from "@/components/button";

CreateAccount.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

export default function CreateAccount() {
  return (
    <div>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm password" />
      <Button>Create account</Button>
    </div>
  );
}
