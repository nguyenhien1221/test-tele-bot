import { useMutation } from "@tanstack/react-query";
import { api } from "../../config/api";

export async function createAcount() {
  return await api.post("/api/v1/profile");
}

export default function useCreateAcount() {
  return useMutation({
    mutationKey: ["createAcount"],
    mutationFn: createAcount,
  });
}
