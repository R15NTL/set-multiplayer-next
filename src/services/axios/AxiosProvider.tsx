import React, { createContext, ReactNode, useMemo } from "react";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXT_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface AxiosContextProviderValue {
  axiosInstance: AxiosInstance;
}

type AxiosProviderProps = {
  children: ReactNode;
};

export const AxiosContext = createContext<
  AxiosContextProviderValue | undefined
>(undefined);

export function AxiosProvider({ children }: AxiosProviderProps) {
  const value = useMemo(
    () => ({
      axiosInstance,
    }),
    []
  );

  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
}
