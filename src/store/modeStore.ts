import { create } from "zustand";

export const useChangeMode = create((set) => ({
  mode: "light",
  updateMode: (mode: string) => set({ mode: mode }),
}));
