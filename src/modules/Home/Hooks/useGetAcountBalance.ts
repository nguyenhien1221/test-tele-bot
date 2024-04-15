import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getAcountBalance() {
  return await api.get<any>(`/api/v1/profile/balance`);
}

export default function useGetAcountBalance() {
  return useQuery({
    queryKey: ["AcountBalance"],
    queryFn: () => getAcountBalance(),
  });
}
