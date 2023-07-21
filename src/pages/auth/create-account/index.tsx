import React, { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Yup
import * as yup from "yup";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Services
import { useAxios } from "@/hooks/useAxios";
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
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  const { axiosInstance } = useAxios();
  const { replace } = useRouter();

  const [formValues, setFormValues] = useState<CreateAccountFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validForm, setValidForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    createAccountSchema
      .validate(formValues)
      .then(() => {
        setValidForm(true);
        setError(null);
      })
      .catch((err) => {
        setValidForm(false);
        setError(err.message);
      });
  }, [formValues]);

  const handleCreateAccount = async () => {
    if (!validForm) return;
    try {
      const response = await axiosInstance.post(
        apiRoutes.user.createAccount.root,
        {
          email: formValues.email,
          password: formValues.password,
          confirm_password: formValues.confirmPassword,
        }
      );

      if (response.status === 200) {
        replace(paths.auth.createAccount.finishUp.root);
      }
    } catch (err) {}
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" className="text-black" placeholder="Email" />
      <input type="password" className="text-black" placeholder="Password" />
      <input
        type="password"
        className="text-black"
        placeholder="Confirm password"
      />
      <Button>Create account</Button>
    </div>
  );
}
