import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getLeaderBoard() {
  return await api.get<any>(`/api/v1/referral-leaderboard?limit=100`);
}

export default function useGetLeaderBoard() {
  return useQuery({
    queryKey: ["Leaderboard"],
    queryFn: () => getLeaderBoard(),
  });
}
