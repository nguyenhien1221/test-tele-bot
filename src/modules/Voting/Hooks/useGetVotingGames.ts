import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getVotingGames() {
  return await api.get<any>(`/api/v1/games/voting-games/`);
}

export default function useGetVotingGames() {
  return useQuery({
    queryKey: ["VotingGames"],
    queryFn: () => getVotingGames(),
  });
}
