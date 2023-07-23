import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { useSession } from "next-auth/react";
import type { AxiosResponse } from "axios";

export interface Account {
  user_id: string;
  email: string;
  username: string;
  email_verified: boolean;
}

export type GetAccountResponse = AxiosResponse<{
  data: {
    data: {
      account: Account;
    };
  };
}>;

export const useGetAccount = () => {
  const { axiosInstance } = useAxios();
  const { status } = useSession();

  return useQuery(
    ["get-account"],
    async () => {
      const data: GetAccountResponse = await axiosInstance.get(
        "api/user/account"
      );
      return data.data.data.data.account;
    },
    {
      enabled: status === "authenticated",
      retry: true,
      refetchOnWindowFocus: true,
    }
  );
};
