import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function upgradeBox() {
  return await api.post("/api/v1/beta-gratitude-mystery-box/my-box/upgrades");
}

export default function useUpgradeBox() {
  return useMutation({
    mutationKey: ["upgradeBox"],
    mutationFn: upgradeBox,
  });
}
