import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function claimBox() {
  return await api.post("/api/v1/beta-gratitude-mystery-box/my-box");
}

export default function useClaimBox() {
  return useMutation({
    mutationKey: ["claimBox"],
    mutationFn: claimBox,
  });
}
