import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/api";

export async function getAcountDetails() {
  return await api.get<any>(`/api/v1/profile`);
}

export default function useGetAcountDetails() {
  return useQuery({
    queryKey: ["AcountDetails"],
    queryFn: () => getAcountDetails(),
  });
}
