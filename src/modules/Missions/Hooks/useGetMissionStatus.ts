import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getMissionsStatus(id: any) {
  return await api.get<any>(`/api/v1/tasks/notification/${id}`);
}

export default function useGetMissionsStatus() {
  return useQuery({
    queryKey: ["MissionsStatus"],
    queryFn: (id) => getMissionsStatus(id),
  });
}
