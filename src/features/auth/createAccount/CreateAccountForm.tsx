import React, { useState } from "react";
// Next
import { useRouter } from "next/router";
// Yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// React Hook Form
import { useForm } from "react-hook-form";
// Icons
import { Icon } from "@iconify/react";
// Services
import { useCreateAccount } from "@/services/mutations/account";
import { AxiosError } from "axios";
// Components
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Paths
import { paths } from "@/routes/paths";

const createAccountSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

interface CreateAccountFormProps {}

export default function CreateAccountForm({}: CreateAccountFormProps) {
  const { push } = useRouter();

  const [error, setError] = useState<string | null>(null);
  const { mutate: createAccount, isLoading: creatingAccount } =
    useCreateAccount();

  const form = useForm<yup.InferType<typeof createAccountSchema>>({
    resolver: yupResolver(createAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleCreateAccount = async (
    data: yup.InferType<typeof createAccountSchema>
  ) => {
    createAccount(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
      },
      {
        onSuccess: () => {
          push(paths.auth.signIn.root);
        },
        onError: (error) => {
          console.log(error);
          if (error instanceof AxiosError) {
            setError(error?.response?.data.data?.message ?? error.message);
            return;
          }
          if (error instanceof Error) {
            setError(error.message);
            return;
          }
          setError("Something went wrong");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateAccount)}
        className="flex flex-col gap-3"
      >
        <CardHeader>
          <CardTitle>Create account</CardTitle>
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
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" type="email" {...field} />
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
          <Button type="submit" className="w-full" loading={creatingAccount}>
            Create account
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
