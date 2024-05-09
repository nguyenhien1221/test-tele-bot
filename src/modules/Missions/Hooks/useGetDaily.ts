import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getDailyMissions() {
  return await api.get<any>(`/api/v1/login-bonuses`);
}

export default function useGetDailyMissions() {
  return useQuery({
    queryKey: ["DailyMissions"],
    queryFn: () => getDailyMissions(),
  });
}
