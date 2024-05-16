export enum bootTypeEnum {
  STORAGE = 0,
  SPEED = 1,
  WATER = 2,
}

export const bootOptions = [
  {
    icon: "/images/storage/1.png",
    title: "Storage",
    description: "Extend the filled time to claim less often",
  },
  {
    icon: "/images/trees/1.png",
    title: "Tree",
    description: "Increase passive planting speed",
  },
  {
    icon: "/images/icons/water.png",
    title: "Holy Water",
    description: "Superboost speed 1.2x.. 2.5x times",
  },
];

export const bootsStorageLevel: {
  [key: string]: { duration: number; price: number };
} = {
  "0": { duration: 2, price: 0 },
  "1": { duration: 3, price: 0.4 },
  "2": { duration: 4, price: 1 },
  "3": { duration: 6, price: 2 },
  "4": { duration: 12, price: 8 },
  "5": { duration: 24, price: 16 },
};

export const boostSpeedLevel: {
  [key: string]: { speed: number; price: number };
} = {
  "0": { speed: 0.01, price: 0 },
  "1": { speed: 0.015, price: 0.4 },
  "2": { speed: 0.02, price: 2 },
  "3": { speed: 0.025, price: 4 },
  "4": { speed: 0.03, price: 10 },
  "5": { speed: 0.05, price: 30 },
};

export const boostWaterLevel: {
  [key: string]: { speed: number; missions: number };
} = {
  "0": { speed: 1, missions: 0 },
  "1": { speed: 1.2, missions: 1 },
  "2": { speed: 1.4, missions: 2 },
  "3": { speed: 1.6, missions: 3 },
  "4": { speed: 1.8, missions: 4 },
  "5": { speed: 2, missions: 5 },
  "6": { speed: 2.5, missions: 6 },
};
