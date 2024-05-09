import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function doDailyMissions(id: string) {
  return await api.post(`/api/v1/login-bonuses`);
}

export default function useDoDailyMissions() {
  return useMutation({
    mutationKey: ["doDailyMissions"],
    mutationFn: doDailyMissions,
  });
}
