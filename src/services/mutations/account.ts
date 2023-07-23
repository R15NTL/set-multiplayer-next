import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";

interface CreateAccountParams {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const useCreateAccount = () => {
  const { axiosInstance } = useAxios();

  return useMutation(async (data: CreateAccountParams) => {
    const response = await axiosInstance.post("api/user/create-account", data);
    return response.data;
  });
};

interface SendEmailVerificationParams {
  email: string;
}

export const useSendVerificationEmail = () => {
  const { axiosInstance } = useAxios();

  return useMutation(async ({ email }: SendEmailVerificationParams) => {
    const response = await axiosInstance.post(
      "api/user/email-verification/send",
      { email }
    );
    return response.data;
  });
};
