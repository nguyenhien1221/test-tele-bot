import {
  BoostType,
  holyWaterLevelToSize,
  miningSpeedLevelToSize,
  storageLevelToSize,
} from "../constants/minedSeed.constants";

export function getStorageSizeByLevel(level: any) {
  return storageLevelToSize[level];
}

export function getMiningSpeedByLevel(level: number) {
  return miningSpeedLevelToSize[level];
}

export const getHolyWaterByLevel = (level: number) => {
  return holyWaterLevelToSize[level];
};

export function calculateMinedSeeds(
  lastClaim: string,
  upgrades: any,
  now: any
) {
  // Copying the upgrades slice
  let copied = upgrades.slice();

  // Sorting the copied slice by timestamp
  copied.sort((a: any, b: any) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  let from = new Date(lastClaim).getTime();
  let currentMiningSpeedLevel = 0;
  let currentStorageSizeLevel = 0;
  let minedSeed = 0;
  let consumedStorageSize = 0;

  for (let i = 0; i < copied.length; i++) {
    let upgrade = copied[i];
    let newMiningSpeedLevel = currentMiningSpeedLevel;
    let newStorageSizeLevel = currentStorageSizeLevel;

    switch (upgrade.upgrade_type) {
      case "mining-speed":
        newMiningSpeedLevel++;
        break;
      case "storage-size":
        newStorageSizeLevel++;
        break;
    }

    const upgradeTimestamp = new Date(upgrade.timestamp).getTime();

    // This should not happen
    if (upgradeTimestamp > now) {
      break;
    }

    if (upgradeTimestamp > from) {
      let maxStorageSize = getStorageSizeByLevel(currentStorageSizeLevel);
      let miningSpeed = getMiningSpeedByLevel(currentMiningSpeedLevel);

      let consumingStorageSize = upgradeTimestamp - from; // Convert milliseconds to seconds

      if (consumingStorageSize + consumedStorageSize > maxStorageSize) {
        consumingStorageSize = maxStorageSize - consumedStorageSize;
      }

      if (consumingStorageSize < 0) {
        consumingStorageSize = 0;
      }

      minedSeed += consumingStorageSize * miningSpeed;

      consumedStorageSize += consumingStorageSize;
      from = upgradeTimestamp;
    }

    currentMiningSpeedLevel = newMiningSpeedLevel;
    currentStorageSizeLevel = newStorageSizeLevel;
  }

  let maxStorageSize = getStorageSizeByLevel(currentStorageSizeLevel);
  let miningSpeed = getMiningSpeedByLevel(currentMiningSpeedLevel);
  let consumingStorageSize = now - from; // Convert milliseconds to seconds

  if (consumingStorageSize + consumedStorageSize > maxStorageSize) {
    consumingStorageSize = maxStorageSize - consumedStorageSize;
  }

  if (consumingStorageSize < 0) {
    consumingStorageSize = 0;
  }

  minedSeed += consumingStorageSize * miningSpeed;

  return minedSeed / 3600000;
}

export const getStorageUpgradesLevel = (data: any) => {
  let storageLevel = 0;
  const hasUpgradeSize = data?.upgrades?.some(
    (item: any) => item.upgrade_type === "storage-size"
  );

  if (data?.upgrades?.length === 0) {
    return storageLevel;
  }
  if (data?.upgrades?.length && hasUpgradeSize) {
    const storageUpgrades = data?.upgrades?.filter(
      (item: any) => item.upgrade_type === "storage-size"
    );

    const level = storageUpgrades?.sort(
      (a: any, b: any) => b.upgrade_level - a.upgrade_level
    )[0]?.upgrade_level;

    return level;
  } else {
    return storageLevel;
  }
};

export const getSpeedUpgradesLevel = (data: any) => {
  let speedLevel = 0;
  const hasUpgradeSpeed = data?.upgrades?.some(
    (item: any) => item.upgrade_type === "mining-speed"
  );

  if (data?.upgrades?.length === 0) {
    return speedLevel;
  }

  if (data?.upgrades?.length && hasUpgradeSpeed) {
    const storageUpgrades = data?.upgrades?.filter(
      (item: any) => item.upgrade_type === "mining-speed"
    );

    const level = storageUpgrades?.sort(
      (a: any, b: any) => b.upgrade_level - a.upgrade_level
    )[0]?.upgrade_level;

    return level;
  } else {
    return speedLevel;
  }
};

export const getWaterUpgradesLevel = (data: any) => {
  let waterLevel = 0;
  const hasUpgradeSpeed = data?.upgrades?.some(
    (item: any) => item.upgrade_type === "holy-water"
  );

  if (data?.upgrades?.length === 0) {
    return waterLevel;
  }

  if (data?.upgrades?.length && hasUpgradeSpeed) {
    const storageUpgrades = data?.upgrades?.filter(
      (item: any) => item.upgrade_type === "holy-water"
    );

    const level = storageUpgrades?.sort(
      (a: any, b: any) => b.upgrade_level - a.upgrade_level
    )[0]?.upgrade_level;

    return level;
  } else {
    return waterLevel;
  }
};

// new caculate mined seeds
export const boardingEventStart = new Date(
  Date.UTC(2024, 4, 7, 0, 0, 0)
).getTime();
export const boardingEventEnd = new Date(
  Date.UTC(2024, 5, 10, 0, 0, 0)
).getTime();

export const boardingEventStart2 = new Date("2024-05-21T09:00:00.0Z").getTime();
export const boardingEventEnd2 = new Date("2024-05-23T09:00:00.0Z").getTime();

interface Boost {
  type: string;
  val: number;
  timestamp: number;
}

function boardingBoosts(): Boost[] {
  return [
    {
      timestamp: boardingEventStart,
      type: BoostType.BoostTypeMiningSpeedScaleUp,
      val: 200,
    },
    {
      timestamp: boardingEventStart2,
      type: BoostType.BoostTypeMiningSpeedScaleUp,
      val: 200,
    },
    {
      timestamp: boardingEventEnd2,
      type: BoostType.BoostTypeMiningSpeedScaleDown,
      val: 200,
    },
    {
      timestamp: boardingEventEnd,
      type: BoostType.BoostTypeMiningSpeedScaleDown,
      val: 200,
    },
  ];
}

export function calculateMinedSeeds2(
  lastClaim: Date,
  initialMiningSpeed: number,
  initialStorageSize: number,
  upgrades: any,
  rewards: any,
  now: number
) {
  let boosts = boardingBoosts();
  boosts = boosts.concat(HappyDaysUserRewardsToBoosts(rewards));

  for (const upgrade of upgrades) {
    switch (upgrade.upgrade_type) {
      case "storage-size":
        boosts.push({
          timestamp: new Date(upgrade.timestamp).getTime(),
          type: BoostType.BoostTypeStorageSizeBaseUpgrade,
          val: getStorageSizeByLevel(upgrade.upgrade_level),
        });
        break;
      case "mining-speed":
        boosts.push({
          timestamp: new Date(upgrade.timestamp).getTime(),
          type: BoostType.BoostTypeMiningSpeedBaseUpgrade,
          val: getMiningSpeedByLevel(upgrade.upgrade_level),
        });
        break;
      case "holy-water":
        boosts.push({
          timestamp: new Date(upgrade.timestamp).getTime(),
          type: BoostType.BoostTypeMiningSpeedBonus,
          val: getHolyWaterByLevel(upgrade.upgrade_level),
        });
        break;
    }
  }

  let copied = boosts.slice(); // Creating a shallow copy of the boosts array

  copied.sort((a: any, b: any) => {
    return a.timestamp - b.timestamp;
  });

  let previousScale = 100;
  let previousBaseMiningSpeed = initialMiningSpeed;
  let previousMiningSpeedBonus = 0;
  let previousBaseStorageSize = initialStorageSize;
  let from = new Date(lastClaim).getTime();
  let minedSeed = 0;
  let consumedStorageSize = 0;

  for (let boost of copied) {
    let currentScale = previousScale;
    let currentBaseMiningSpeed = previousBaseMiningSpeed;
    let currentMiningSpeedBonus = previousMiningSpeedBonus;
    let currentBaseStorageSize = previousBaseStorageSize;

    switch (boost.type) {
      case BoostType.BoostTypeMiningSpeedBaseUpgrade:
        currentBaseMiningSpeed = boost.val;
        break;
      case BoostType.BoostTypeMiningSpeedBonus:
        currentMiningSpeedBonus = boost.val;
        break;
      case BoostType.BoostTypeMiningSpeedScaleUp:
        currentScale *= boost.val / 100;
        break;
      case BoostType.BoostTypeMiningSpeedScaleDown:
        currentScale = (currentScale * 100) / boost.val;
        break;
      case BoostType.BoostTypeStorageSizeBaseUpgrade:
        currentBaseStorageSize = boost.val;
        break;
    }

    if (boost.timestamp > now) {
      break;
    }

    if (boost.timestamp > from) {
      let consumingStorageSize = boost.timestamp - from; // in milliseconds

      if (
        consumingStorageSize + consumedStorageSize >
        previousBaseStorageSize
      ) {
        consumingStorageSize = previousBaseStorageSize - consumedStorageSize;
      }

      minedSeed +=
        (consumingStorageSize *
          previousBaseMiningSpeed *
          (100 + previousMiningSpeedBonus) *
          previousScale) /
        10000;
      consumedStorageSize += consumingStorageSize;
      from = boost.timestamp;
    }

    previousScale = currentScale;
    previousBaseMiningSpeed = currentBaseMiningSpeed;
    previousMiningSpeedBonus = currentMiningSpeedBonus;
    previousBaseStorageSize = currentBaseStorageSize;
  }

  let consumingStorageSize = now - from; // in milliseconds
  if (consumingStorageSize + consumedStorageSize > previousBaseStorageSize) {
    consumingStorageSize = previousBaseStorageSize - consumedStorageSize;
  }
  minedSeed +=
    (consumingStorageSize *
      previousBaseMiningSpeed *
      (100 + previousMiningSpeedBonus) *
      previousScale) /
    10000;

  return minedSeed / 3600000; // Converting mined seeds to per hour
}

export function HappyDaysUserRewardsToBoosts(rewards: any) {
  var boosts: Boost[] = [];

  for (var i = 0; i < rewards.length; i++) {
    var reward = rewards[i];
    switch (reward.type) {
      case "mining-speed":
        boosts.push({
          timestamp: new Date(reward.timestamp).getTime(),
          type: BoostType.BoostTypeMiningSpeedScaleUp,
          val: reward.amount,
        });

        if (reward.expired_in > 0) {
          var expirationTime =
            new Date(reward.timestamp).getTime() + reward.expired_in * 3600000;

          boosts.push({
            timestamp: expirationTime,
            type: BoostType.BoostTypeMiningSpeedScaleDown,
            val: reward.amount,
          });
        }
        break;
      // Add cases for other reward types if needed
    }
  }
  return boosts;
}

export function calculateMiningSpeed(
  initialMiningSpeed: number,
  upgrades: any,
  rewards: any,
  now: number
) {
  let boosts = boardingBoosts();
  const rewardBoosts = HappyDaysUserRewardsToBoosts(rewards);

  boosts = boosts.concat(rewardBoosts);

  for (const upgrade of upgrades) {
    switch (upgrade.upgrade_type) {
      case "storage-size":
        boosts.push({
          timestamp: upgrade.timestamp,
          type: BoostType.BoostTypeStorageSizeBaseUpgrade,
          val: getStorageSizeByLevel(upgrade.upgrade_level),
        });
        break;
      case "mining-speed":
        boosts.push({
          timestamp: upgrade.timestamp,
          type: BoostType.BoostTypeMiningSpeedBaseUpgrade,
          val: getMiningSpeedByLevel(upgrade.upgrade_level),
        });
        break;
      case "holy-water":
        boosts.push({
          timestamp: upgrade.timestamp,
          type: BoostType.BoostTypeMiningSpeedBonus,
          val: getHolyWaterByLevel(upgrade.upgrade_level),
        });
        break;
    }
  }

  let copied = boosts.slice(); // Creating a shallow copy of the boosts array

  copied.sort((a: any, b: any) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  let previousScale = 100;
  let previousBaseMiningSpeed = initialMiningSpeed;
  let previousMiningSpeedBonus = 0;
  let from = 0;

  for (let boost of copied) {
    let currentScale = previousScale;
    let currentBaseMiningSpeed = previousBaseMiningSpeed;
    let currentMiningSpeedBonus = previousMiningSpeedBonus;

    switch (boost.type) {
      case BoostType.BoostTypeMiningSpeedBaseUpgrade:
        currentBaseMiningSpeed = boost.val;
        break;
      case BoostType.BoostTypeMiningSpeedBonus:
        currentMiningSpeedBonus = boost.val;
        break;
      case BoostType.BoostTypeMiningSpeedScaleUp:
        currentScale *= boost.val / 100;
        break;
      case BoostType.BoostTypeMiningSpeedScaleDown:
        currentScale = (currentScale * 100) / boost.val;
        break;
    }

    if (boost.timestamp > now) {
      break;
    }

    if (boost.timestamp > from) {
      from = boost.timestamp;
    }

    previousScale = currentScale;
    previousBaseMiningSpeed = currentBaseMiningSpeed;
    previousMiningSpeedBonus = currentMiningSpeedBonus;
  }

  const speed =
    (previousBaseMiningSpeed *
      (100 + previousMiningSpeedBonus) *
      previousScale) /
    10000;

  return speed;
}
