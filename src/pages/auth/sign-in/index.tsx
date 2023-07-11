import React from "react";
// Next
import Link from "next/link";
// Routes
import { paths } from "@/routes/paths";
// Components
import { Button } from "@/components/button";
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Auth
import { useSession, signIn } from "next-auth/react";

SignIn.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default function SignIn() {
  const { data: session } = useSession();

  const handleSignInWithGoogle = () => signIn("google-sign-in");
  return (
    <>
      <div className=" px-page-x-padding py-page-y-padding">
        <Button onClick={handleSignInWithGoogle}>Sign in with google</Button>
        <p>Or</p>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <Link href={paths.auth.createAccount.root}>Create account</Link>
      </div>
    </>
  );
}
