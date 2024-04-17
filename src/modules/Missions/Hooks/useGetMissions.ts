import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getMissions() {
  return await api.get<any>(`/api/v1/tasks/progresses`);
}

export default function useGetMissions() {
  return useQuery({
    queryKey: ["Missions"],
    queryFn: () => getMissions(),
  });
}
