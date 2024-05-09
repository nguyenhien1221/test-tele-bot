import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getHappyDayHistory() {
  return await api.get<any>(`/api/v1/happy-days/my-history`);
}

export default function useGetHappyDayHistory() {
  return useQuery({
    queryKey: ["HappyDayHistory"],
    queryFn: () => getHappyDayHistory(),
  });
}
