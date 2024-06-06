import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function getUserRank() {
  return await api.get<any>(`/api/v1/referral-leaderboard/me`);
}

export default function useGetUserRank() {
  return useQuery({
    queryKey: ["UserRank"],
    queryFn: () => getUserRank(),
  });
}
