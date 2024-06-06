import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getBoxSettings() {
  return await api.get<any>(`/api/v1/beta-gratitude-mystery-box/settings`);
}

export default function useGetBoxSettings() {
  return useQuery({
    queryKey: ["BoxSettings"],
    queryFn: () => getBoxSettings(),
  });
}
