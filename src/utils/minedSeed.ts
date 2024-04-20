import {
  miningSpeedLevelToSize,
  storageLevelToSize,
} from "../constants/minedSeed.constants";

export function getStorageSizeByLevel(level: any) {
  return storageLevelToSize[level];
}

export function getMiningSpeedByLevel(level: number) {
  return miningSpeedLevelToSize[level];
}

export function calculateMinedSeeds(
  lastClaim: string,
  upgrades: any,
  now: any
) {
  // Copying the upgrades slice
  let copied = upgrades.slice();

  // Sorting the copied slice by timestamp
  copied.sort((a: any, b: any) => a.timestamp - b.timestamp);

  let from = new Date(lastClaim).getTime();
  let currentMiningSpeedLevel = 0;
  let currentStorageSizeLevel = 0;
  let minedSeed = 0;
  let consumedStorageSize = 0;

  for (let i = 0; i < copied.length; i++) {
    let upgrade = copied[i];
    let newMiningSpeedLevel = currentMiningSpeedLevel;
    let newStorageSizeLevel = currentStorageSizeLevel;

    switch (upgrade.upgradeType) {
      case "MiningSpeed":
        newMiningSpeedLevel++;
        break;
      case "StorageSize":
        newStorageSizeLevel++;
        break;
    }

    // This should not happen
    if (upgrade.timestamp > now) {
      break;
    }

    if (upgrade.timestamp > from) {
      let maxStorageSize = getStorageSizeByLevel(currentStorageSizeLevel);
      let miningSpeed = getMiningSpeedByLevel(currentMiningSpeedLevel);

      let consumingStorageSize = Math.round((upgrade.timestamp - from) / 1000); // Convert milliseconds to seconds

      if (consumingStorageSize + consumedStorageSize > maxStorageSize) {
        consumingStorageSize = maxStorageSize - consumedStorageSize;
      }

      minedSeed += consumingStorageSize * miningSpeed;

      consumedStorageSize += consumingStorageSize;
      from = upgrade.timestamp;
    }

    currentMiningSpeedLevel = newMiningSpeedLevel;
    currentStorageSizeLevel = newStorageSizeLevel;
  }

  let maxStorageSize = getStorageSizeByLevel(currentStorageSizeLevel);
  let miningSpeed = getMiningSpeedByLevel(currentMiningSpeedLevel);
  let consumingStorageSize = Math.round((now - from) / 1000); // Convert milliseconds to seconds

  if (consumingStorageSize + consumedStorageSize > maxStorageSize) {
    consumingStorageSize = maxStorageSize - consumedStorageSize;
  }

  minedSeed += consumingStorageSize * miningSpeed;

  return minedSeed;
}

export const getStorageUpgradesLevel = (data: any) => {
  let storageLevel = 1;
  const hasUpgradeSize = data?.upgrades?.some((item: any) => item.upgrade_type === "storage-size")

  if (data?.upgrades?.length === 0) {
    return storageLevel;
  }
  if(data?.upgrades?.length &&  hasUpgradeSize ) {
    const storageUpgrades = data?.upgrades?.filter(
      (item: any) => item.upgrade_type === "storage-size"
    );
  
    const level = storageUpgrades?.sort(
      (a: any, b: any) => a.upgrade_level - b.upgrade_level
    )[0]?.upgrade_level;
  
    return level;
  } else {
    return storageLevel
  }
};

export const getSpeedUpgradesLevel = (data: any) => {
  let speedLevel = 1;
  const hasUpgradeSpeed = data?.upgrades?.some((item: any) => item.upgrade_type === "mining-speed")

  if (data?.upgrades?.length === 0) {
    return speedLevel;
  }

  if(data?.upgrades?.length &&  hasUpgradeSpeed ) {

    const storageUpgrades = data?.upgrades?.filter( 
      (item: any) => item.upgrade_type === "mining-speed"
    );
    
    const level = storageUpgrades?.sort(
      (a: any, b: any) => a.upgrade_level - b.upgrade_level
    )[0]?.upgrade_level;
    return level;
  } else {
    return speedLevel
  }

};


