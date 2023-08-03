import React from "react";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Auth
import GuestGuard from "@/features/auth/GuestGuard";
import SignIn from "@/features/auth/signIn/SignIn";

SignInPage.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <GuestGuard>{page}</GuestGuard>
  </MainLayout>
);

export default function SignInPage() {
  return <SignIn />;
}
