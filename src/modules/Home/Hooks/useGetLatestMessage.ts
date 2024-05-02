import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getLatestMessage() {
  return await api.get<any>(`/api/v1/latest-message`);
}

export default function useGetLatestMessage() {
  return useQuery({
    queryKey: ["LatestMessage"],
    queryFn: () => getLatestMessage(),
  });
}
