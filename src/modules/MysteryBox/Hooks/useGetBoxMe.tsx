import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getBoxMe() {
  return await api.get<any>(`/api/v1/beta-gratitude-mystery-box/me`);
}

export default function useGetBoxMe() {
  return useQuery({
    queryKey: ["BoxMe"],
    queryFn: () => getBoxMe(),
  });
}
