export enum bootTypeEnum {
  STORAGE = 0,
  SPEED = 1,
  WATER = 2,
}

export const bootOptions = [
  {
    icon: "/images/storage/1.png",
    title: "Storage",
    description: "Increase the storage capacity of the mined",
  },
  {
    icon: "/images/trees/6.png",
    title: "Tree",
    description: "Increase mining speed",
  },
  {
    icon: "/images/icons/water.png",
    title: "Holy Water",
    description: "Boost mining speed by 1.25x, 1.5x, 2x times",
  },
];

export const bootsStorageLevel = [
  { duration: 2, price: 0 },
  { duration: 3, price: 0.2 },
  { duration: 4, price: 0.5 },
  { duration: 6, price: 1 },
  { duration: 12, price: 4 },
  { duration: 24, price: 10 },
];

export const boostSpeedLevel = [
  { speed: 0.01, price: 0 },
  { speed: 0.015, price: 0.2 },
  { speed: 0.02, price: 1 },
  { speed: 0.025, price: 2 },
  { speed: 0.03, price: 5 },
  { speed: 0.05, price: 15 },
];
