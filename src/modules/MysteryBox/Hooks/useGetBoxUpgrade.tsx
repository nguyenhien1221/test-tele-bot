import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getBoxUpgrade() {
  return await api.get<any>(`/api/v1/beta-gratitude-mystery-box/upgrades`);
}

export default function useGetBoxUpgrade() {
  return useQuery({
    queryKey: ["BoxUpgrade"],
    queryFn: () => getBoxUpgrade(),
  });
}
