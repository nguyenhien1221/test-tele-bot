import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";

export async function getSetting() {
  return await api.get<any>(`/api/v1/settings`);
}

export default function useGetSetting() {
  return useQuery({
    queryKey: ["Setting"],
    queryFn: () => getSetting(),
  });
}
