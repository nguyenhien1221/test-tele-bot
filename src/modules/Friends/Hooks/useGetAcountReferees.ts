import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getAcountReferees() {
  return await api.get<any>(`/api/v1/profile/referees`);
}

export default function useGetAcountReferees() {
  return useQuery({
    queryKey: ["AcountReferees"],
    queryFn: () => getAcountReferees(),
  });
}
