import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function votingClaim(id: number | string) {
  return await api.post(`/api/v1/games/voting-games/${id}/claim`);
}

export default function useVotingClaim() {
  return useMutation({
    mutationKey: ["VotingClaim"],
    mutationFn: votingClaim,
  });
}
