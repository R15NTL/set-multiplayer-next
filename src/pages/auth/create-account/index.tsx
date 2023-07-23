import React, { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// React Hook Form
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Paths
import { paths } from "@/routes/paths";

// Features
import CreateAccountForm from "@/features/auth/createAccount/CreateAccountForm";

CreateAccount.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

export default function CreateAccount() {
  return (
    <Card className=" m-auto w-full max-w-md flex flex-col gap-3">
      <CreateAccountForm />
    </Card>
  );
}
