import React, { useState, useMemo } from "react";
// Next
import Link from "next/link";
import { useRouter } from "next/router";
// Routes
import { paths } from "@/routes/paths";
// Icons
import { Icon } from "@iconify/react";
// Form
import * as yup from "yup";
// Components
import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
// React Hook Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Auth
import GuestGuard from "@/features/auth/GuestGuard";
// Services
import { useResetPassword } from "@/services/mutations/account";
import { AxiosError } from "axios";

ForgotPasswordReset.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <GuestGuard>{page}</GuestGuard>
  </MainLayout>
);

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ForgotPasswordReset() {
  const { query, replace } = useRouter();
  const { mutate: resetPassword, isLoading: isResetting } = useResetPassword();

  const [error, setError] = useState<string | null>(null);
  const [isReset, setIsReset] = useState<boolean>(false);

  const form = useForm<yup.InferType<typeof resetPasswordSchema>>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (
    data: yup.InferType<typeof resetPasswordSchema>
  ) => {
    resetPassword(
      {
        token: String(query.token),
        password: data.password,
        confirm_password: data.confirmPassword,
      },
      {
        onSuccess: () => {
          setIsReset(true);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            console.log(error);
            if (error?.response?.data?.data?.message) {
              return setError(error?.response?.data?.data?.message);
            }
            return setError(error.message);
          }
          return setError("Something went wrong");
        },
      }
    );
  };

  if (isReset)
    return (
      <div className="m-auto w-full max-w-lg flex flex-col text-center items-center gap-5">
        <Icon icon="tabler:lock-check" className="text-muted w-32 h-32" />
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Password reset!</h1>
          <p className=" text-sm">
            You can now sign in using your new password
          </p>
        </div>
        <Button href={paths.auth.signIn.root} className="mt-3">
          Go to login
        </Button>
      </div>
    );

  return (
    <Card className="m-auto w-full max-w-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleResetPassword)}
          className="flex flex-col gap-3"
        >
          <CardHeader>
            <CardTitle>Set a new password</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {error && (
              <Alert variant="destructive">
                <AlertDescription className="flex">
                  <p>{error}</p>
                </AlertDescription>
              </Alert>
            )}

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Min length 8 characters"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" loading={isResetting}>
              Reset password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
