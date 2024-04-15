export enum bootTypeEnum {
  STORAGE = 0,
  SPEED = 1,
  WATER = 2,
}

export const bootOptions = [
  {
    icon: "/images/icons/storage1.svg",
    title: "Box Storage",
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

export const bootsStorageItems = {
  "1": 2,
  "2": 3,
  "3": 4,
  "4": 5,
  "5": 6,
  "6": 7,
};
