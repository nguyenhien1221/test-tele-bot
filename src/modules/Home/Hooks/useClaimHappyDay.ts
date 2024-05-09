import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function claimHappyDay() {
  return await api.post("/api/v1/happy-days");
}

export default function useClaimHappyDay() {
  return useMutation({
    mutationKey: ["claimHappyDay"],
    mutationFn: claimHappyDay,
  });
}
