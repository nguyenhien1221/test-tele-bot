import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/api";

interface RegisterParamsType {
  initData: string;
}

export async function getAcountDetails({ initData }: RegisterParamsType) {
  return await api.get<any>(`/api/v1/profile/${initData}`);
}

// export default function useGetAcountDetails(data: RegisterParamsType) {
//   return useQuery(["getAcountDetails", data], () => getAcountDetails(data));
// }
