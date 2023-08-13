import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { useToast } from "@/components/ui/use-toast";

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

export const useSendPasswordResetLink = () => {
  const { axiosInstance } = useAxios();

  return useMutation(async ({ email }: SendEmailVerificationParams) => {
    const response = await axiosInstance.post("api/user/reset-password/send", {
      email,
    });
    return response.data;
  });
};

interface ResetPasswordParams {
  token?: string;
  password: string;
  confirm_password: string;
}

export const useResetPassword = () => {
  const { axiosInstance } = useAxios();

  return useMutation(async (data: ResetPasswordParams) => {
    const response = await axiosInstance.put(
      "api/user/reset-password/reset",
      data
    );
    return response.data;
  });
};

interface VerifyEmailParams {
  token?: string;
}

export const useVerifyEmail = () => {
  const { axiosInstance } = useAxios();

  return useMutation(async (data: VerifyEmailParams) => {
    const response = await axiosInstance.put(
      "api/user/email-verification/verify",
      data
    );
    return response.data;
  });
};

interface UpdateAccountParams {
  username: string;
}

export const useUpdateAccount = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    async (data: UpdateAccountParams) => {
      const response = await axiosInstance.put("api/user/account", data);

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-account"]);
        toast({
          title: "Account successfully updated",
        });
      },
      onError: (error) => {
        const message =
          error instanceof Error &&
          (error as any).response?.data?.data?.message;

        if (typeof message === "string") {
          toast({
            title: message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Error updating account",
          variant: "destructive",
        });
      },
    }
  );
};
