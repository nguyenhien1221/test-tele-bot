import { AxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

function handleQueryError(error: unknown) {
  let message = "";

  if (error instanceof AxiosError)
    message = error.response?.data?.message || error.message;
  else if (error instanceof Error)
    message = `Execution error: ${error.message}`;
  // toast.error(message);
  console.log(message);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
    mutations: {
      onError: handleQueryError,
    },
  },
});
