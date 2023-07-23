import React, { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Yup
import * as yup from "yup";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Services
import { useAxios } from "@/hooks/useAxios";
import { useCreateAccount } from "@/services/mutations/account";
// Components
import { Button } from "@/components/button";
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
    <div>
      <input type="email" className="text-black" placeholder="Email" />
      <input type="password" className="text-black" placeholder="Password" />
      <input
        type="password"
        className="text-black"
        placeholder="Confirm password"
      />
      <Button disabled onClick={handleCreateAccount}>
        Create account
      </Button>
    </div>
  );
}
