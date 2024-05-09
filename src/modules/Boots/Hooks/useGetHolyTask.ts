import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getWaterMissions() {
  return await api.get<any>(`/api/v1/upgrades/tasks/progresses`);
}

export default function useGetWaterMissions() {
  return useQuery({
    queryKey: ["WaterMissions"],
    queryFn: () => getWaterMissions(),
  });
}
