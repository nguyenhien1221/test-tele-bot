import { create } from "zustand";

interface BoxType {
  myBox: any;
  updateBox(myBox: any): void;
}

const initSettings = {
  initial_box_level: 3,
  referral_data: null,
  upgrade_data: {
    speed_level: 5,
    storage_level: 4,
  },
};

export const useMyBox = create<BoxType>((set) => ({
  myBox: initSettings,
  updateBox: (myBox: any) => set({ myBox: myBox }),
}));
