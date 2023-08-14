import React, { useState } from "react";
// Form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// React query
import { useGetAccount } from "@/services/queries/account";
import { useChangePassword } from "@/services/mutations/account";

interface ChangePasswordProps {
  handleTabChange: (value: string) => void;
}

const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 charecters")
    .required("This is a required field"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("This is a required field"),
});

export default function ChangePassword({
  handleTabChange,
}: ChangePasswordProps) {
  const { data: account } = useGetAccount();
  const { mutate: changePassword, isLoading: isUpdatingPassword } =
    useChangePassword();

  // State
  const [isLoading, setIsLoading] = useState(false);

  // Form
  const form = useForm<yup.InferType<typeof changePasswordSchema>>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleSavePassword = (
    data: yup.InferType<typeof changePasswordSchema>
  ) => {
    changePassword(
      {
        password: data.password,
        confirm_password: data.passwordConfirmation,
      },
      {
        onSuccess: () => {
          form.reset();
          handleTabChange("account");
        },
      }
    );
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSavePassword)}>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="passwordConfirmation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" loading={isUpdatingPassword}>
              Save password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
