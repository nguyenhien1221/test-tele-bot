import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function doMissions(id: string) {
  return await api.post(`/api/v1/tasks/${id}`);
}

export default function useDoMissions() {
  return useMutation({
    mutationKey: ["doMissions"],
    mutationFn: doMissions,
    retry: 0,
    // retryDelay: 3000,
  });
}
