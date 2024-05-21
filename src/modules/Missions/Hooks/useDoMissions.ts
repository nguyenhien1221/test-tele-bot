import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function doMissions(id: string) {
  return await api.post(`/api/v1/tasks/${id}`);
}

export default function useDoMissions() {
  return useMutation({
    mutationKey: ["doMissions"],
    mutationFn: doMissions,
    retry: (count, err: any) => {
      if (count >= 5) {
        return false;
      }
      if (err?.response?.data.message === "task already completed") {
        return false;
      }
      return true;
    },
    retryDelay: 3000,
  });
}
