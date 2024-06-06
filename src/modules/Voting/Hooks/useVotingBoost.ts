import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function votingBoost(id: string | number) {
  return await api.post(`/api/v1/games/voting-games/${id}/votes/boost`);
}

export default function useVotingBoost() {
  return useMutation({
    mutationKey: ["VotingBoost"],
    mutationFn: votingBoost,
  });
}
