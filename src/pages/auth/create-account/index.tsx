import React, { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Yup
import * as yup from "yup";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Services
import { useCreateAccount } from "@/services/mutations/account";
// Components
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Paths
import { paths, apiRoutes } from "@/routes/paths";

CreateAccount.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

const createAccountSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface CreateAccountFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  const { replace } = useRouter();
  const { mutate: createAccount } = useCreateAccount();

  const [formValues, setFormValues] = useState<CreateAccountFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleCreateAccount = async () => {
    createAccount(
      {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        confirm_password: formValues.confirmPassword,
      },
      {
        onSuccess: () => {
          replace(paths.auth.createAccount.finishUp.root);
        },
      }
    );
  };

  return (
    <Card className=" m-auto w-full max-w-md flex flex-col gap-3">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={(e) =>
              setFormValues({ ...formValues, confirmPassword: e.target.value })
            }
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCreateAccount} className="w-full">
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
}
