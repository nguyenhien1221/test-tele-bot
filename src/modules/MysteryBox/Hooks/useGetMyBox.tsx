import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getMyBox() {
  return await api.get<any>(`/api/v1/beta-gratitude-mystery-box/my-box`);
}

export default function useGetMyBox() {
  return useQuery({
    queryKey: ["MyBox"],
    queryFn: () => getMyBox(),
  });
}
