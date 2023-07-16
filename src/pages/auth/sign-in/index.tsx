import React, { useState, useMemo } from "react";
// Next
import Link from "next/link";
// Routes
import { paths } from "@/routes/paths";
// Components
import { Button } from "@/components/button";
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Auth
import { useSession, signIn } from "next-auth/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { type } from "os";

SignIn.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default function SignIn() {
  const { data: session } = useSession();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const getHandleCredentialsChange =
    (key: keyof typeof credentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSignInWithGoogle = () => signIn("google-sign-in");

  const handleSignInWithEmailAndPassword = () => {
    if (typeof window === "undefined") return;
    initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });

    const auth = getAuth();

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.getIdToken().then((idToken) => {
          // Here, you now have the ID token
          // You can now send this token to your backend
          signIn("credentials", {
            token: idToken,
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...handle errors here
      });
  };

  return (
    <>
      <div className=" px-page-x-padding py-page-y-padding">
        <Button onClick={handleSignInWithGoogle}>Sign in with google</Button>
        <p>Or</p>
        <input
          className="text-black"
          value={credentials.email}
          onChange={getHandleCredentialsChange("email")}
          type="email"
          placeholder="Email"
        />
        <input
          className="text-black"
          value={credentials.password}
          onChange={getHandleCredentialsChange("password")}
          type="password"
          placeholder="Password"
        />
        <Button onClick={handleSignInWithEmailAndPassword}>Sign in</Button>
        <Link href={paths.auth.createAccount.root}>Create account</Link>
      </div>
    </>
  );
}
