import {
  MutationCache,
  QueryCache,
  QueryClientConfig,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const RQGlobalConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      handleErrorAndShowToast(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleErrorAndShowToast(error);
    },
  }),
};

const handleErrorAndShowToast = (error: unknown) => {
  const axiosError = error as AxiosError<{ message: string }>;
  const message = axiosError.response?.data.message
    ? axiosError.response?.data.message
    : axiosError.message;
  toast(message, { type: "error" });
};
