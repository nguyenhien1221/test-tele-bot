import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getVotingParticipant(id: string | number) {
  return await api.get<any>(`/api/v1/games/voting-games/${id}/me`);
}

export default function useGetVotingParticipant(id: string | number) {
  return useQuery({
    queryKey: ["VotingParticipant"],
    queryFn: () => getVotingParticipant(id),
    enabled: Boolean(id),
  });
}
