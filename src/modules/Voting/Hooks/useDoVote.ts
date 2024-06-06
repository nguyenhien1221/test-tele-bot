import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function doVote(params: any) {
  return await api.post<any>(
    `/api/v1/games/voting-games/${params?.votingId}/votes`,
    { cm_id: params?.cmId },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export default function useDoVote() {
  return useMutation({
    mutationKey: ["DoVote"],
    mutationFn: doVote,
  });
}
