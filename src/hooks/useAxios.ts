import { useContext } from "react";
import { AxiosContext } from "@/services/axios/AxiosProvider";

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context)
    throw new Error("useAxios must be used within the AxiosProvider");

  return context;
};
