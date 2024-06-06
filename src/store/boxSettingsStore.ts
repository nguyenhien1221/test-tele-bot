import { create } from "zustand";

interface BoxSettingsType {
  myBoxSettings: any;
  updateBoxSettings(myBoxSettings: any): void;
}

const initBoxSettings = {
  claim_box_after: "2024-06-05T10:00:00Z",
  max_box_level: 7,
  open_box_after: "2024-06-12T00:00:00Z",
  upgrade_box_before: null,
  upgrade_level_to_box_level: {
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 2,
    7: 2,
    8: 3,
    9: 3,
    10: 4,
    11: 4,
    12: 5,
  },
  upgrade_limits: { 6: 550, 7: 50 },
  upgrade_refer_requirements: { 2: 2, 3: 4, 4: 8, 5: 16, 6: 64, 7: 256 },
};

export const useBoxSettings = create<BoxSettingsType>((set) => ({
  myBoxSettings: initBoxSettings,
  updateBoxSettings: (myBoxSettings: any) =>
    set({ myBoxSettings: myBoxSettings }),
}));
