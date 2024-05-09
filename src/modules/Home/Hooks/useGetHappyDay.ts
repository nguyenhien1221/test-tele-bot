import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getHappyDay() {
  return await api.get<any>(`/api/v1/happy-days`);
}

export default function useGetHappyDay() {
  return useQuery({
    queryKey: ["HappyDay"],
    queryFn: () => getHappyDay(),
  });
}
