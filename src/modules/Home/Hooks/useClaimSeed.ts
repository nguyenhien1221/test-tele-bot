import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function claimSeed() {
  return await api.post("/api/v1/seed/claim");
}

export default function useClaimSeed() {
  return useMutation({
    mutationKey: ["claimSeed"],
    mutationFn: claimSeed,
  });
}
