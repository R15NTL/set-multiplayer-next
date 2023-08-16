import React from "react";
import Head from "next/head";
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
  return (
    <>
      <Head>
        <title>Sign in | Set Multiplayer</title>
      </Head>
      <SignIn />
    </>
  );
}
