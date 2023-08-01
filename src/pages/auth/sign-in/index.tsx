import React, { useState, useMemo } from "react";
// Next
import Link from "next/link";
// Routes
import { paths } from "@/routes/paths";
// Icons
import { Icon } from "@iconify/react";
// Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLayout from "@/layouts/mainLayout/MainLayout";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
// Auth
import { useSession, signIn } from "next-auth/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import GuestGuard from "@/features/auth/GuestGuard";

SignIn.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <GuestGuard>{page}</GuestGuard>
  </MainLayout>
);

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: yup.string().required("Password is a required field"),
});

export default function SignIn() {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleSignInWithGoogle = () => signIn("google-sign-in");

  // Form
  const form = useForm<yup.InferType<typeof signInSchema>>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignInWithEmailAndPassword = (
    data: yup.InferType<typeof signInSchema>
  ) => {
    if (typeof window === "undefined") return;
    initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    const auth = getAuth();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((idToken) => {
          signIn("credentials", {
            token: idToken,
          });
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoading(false);
        setError(errorMessage);
      });
  };

  return (
    <>
      <Card className="m-auto w-full max-w-sm flex flex-col gap-3">
        <CardHeader className="space-y-1">
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleSignInWithEmailAndPassword)}
          >
            <CardContent className="grid gap-3 pb-0">
              <div className=" flex flex-col">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleSignInWithGoogle}
                >
                  <span>
                    <Icon className="inline mr-3" icon="logos:google-icon" />
                  </span>
                  <span>Sign in with Google</span>
                </Button>
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex flex-col gap-3">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="me@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Link
                href={paths.auth.forgotPassword.send}
                className="text-xs ml-auto hover:underline my-1"
              >
                Forgot password?
              </Link>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" loading={isLoading}>
                Sign in
              </Button>
              <Link className="w-full" href={paths.auth.createAccount.root}>
                <Button variant="ghost" className="w-full" type="button">
                  Don't have an account? Sign up
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
