import { create } from "zustand";

export const useCheckMission = create((set) => ({
  hasMission: false,
  updateMission: (hasMission: string) => set({ hasMission: hasMission }),
}));
