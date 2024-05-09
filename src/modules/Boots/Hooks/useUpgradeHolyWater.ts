import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function upgradeWater() {
  return await api.post("/api/v1/upgrades/holy-water");
}

export default function useUpgradeWater() {
  return useMutation({
    mutationKey: ["upgradeWater"],
    mutationFn: upgradeWater,
  });
}
