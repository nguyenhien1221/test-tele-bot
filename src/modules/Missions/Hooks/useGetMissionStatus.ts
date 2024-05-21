import { skipToken, useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getMissionsStatus(id: any) {
  return await api.get<any>(`/api/v1/tasks/notification/${id}`);
}

export default function useGetMissionsStatus(id: any) {
  return useQuery({
    queryKey: ["MissionsStatus", id],
    queryFn: id ? () => getMissionsStatus(id) : skipToken,
    retry: 5,
    retryDelay: 2000,
  });
}
