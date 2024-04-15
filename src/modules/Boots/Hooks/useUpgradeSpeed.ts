import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function upgradeSpeed() {
  return await api.post("/api/v1/seed/mining-speed/upgrade");
}

export default function useUpgradeSpeed() {
  return useMutation({
    mutationKey: ["upgradeSpeed"],
    mutationFn: upgradeSpeed,
  });
}
