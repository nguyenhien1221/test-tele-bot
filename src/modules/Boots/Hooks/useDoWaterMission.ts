import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function doWaterMissions(id: string) {
  return await api.post(`/api/v1/upgrades/tasks/${id}`);
}

export default function useDoWaterMissions() {
  return useMutation({
    mutationKey: ["doWaterMissions"],
    mutationFn: doWaterMissions,
  });
}
