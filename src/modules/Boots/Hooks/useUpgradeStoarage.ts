import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";

export async function upgradeStorage() {
  return await api.post("/api/v1/seed/storage-size/upgrade");
}

export default function useUpgradeStorage() {
  return useMutation({
    mutationKey: ["upgradeStorage"],
    mutationFn: upgradeStorage,
  });
}
