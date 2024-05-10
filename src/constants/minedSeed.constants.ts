export const storageLevelToSize = [
  2 * 3600 * 1000,
  3 * 3600 * 1000,
  4 * 3600 * 1000,
  6 * 3600 * 1000,
  12 * 3600 * 1000,
  24 * 3600 * 1000,
];

export const miningSpeedLevelToSize = [
  10000000, 15000000, 20000000, 25000000, 30000000, 50000000,
];

export const holyWaterLevelToSize = [0, 20, 40, 60, 80, 100, 150];

export const ClaimThreshold: number = 2 * 60 * 1000; // ClaimThreshold is in milliseconds

export enum BoostType {
  BoostTypeMiningSpeedBaseUpgrade = "mining-speed-base-upgrade",
  BoostTypeMiningSpeedBonus = "mining-speed-bonus",
  BoostTypeMiningSpeedScaleUp = "mining-speed-scale-up",
  BoostTypeMiningSpeedScaleDown = "mining-speed-scale-down",
  BoostTypeStorageSizeBaseUpgrade = "storage-size-base-upgrade",
}
