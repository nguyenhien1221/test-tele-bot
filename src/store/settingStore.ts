import { create } from "zustand";

interface SettingType {
  settings: any;
  updateSettings(settings: any): void;
}

const initSettings = {
  boarding_event: {},
  happy_days: {},
  happy_days_rewards: [],
  holy_water: [],
  holy_water_costs: [],
  login_bonuses: [],
  mining_speed: [],
  mining_speed_costs: [],
  storage_size: [],
  storage_size_costs: [],
};

export const useChangeSettings = create<SettingType>((set) => ({
  settings: initSettings,
  updateSettings: (settings: string) => set({ settings: settings }),
}));
