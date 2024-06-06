import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getVotingGameDetail(id: string | number) {
  return await api.get<any>(`/api/v1/games/voting-games/${id}`);
}

export default function useGetVotingGameDetail(id: string | number) {
  return useQuery({
    queryKey: ["VotingGameDetail"],
    queryFn: () => getVotingGameDetail(id),
    enabled: Boolean(id),
  });
}
