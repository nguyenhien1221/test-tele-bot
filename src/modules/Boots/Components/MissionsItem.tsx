import clsx from "clsx";
import {
  boostSpeedLevel,
  boostWaterLevel,
  bootTypeEnum,
  bootsStorageLevel,
} from "../../../constants/boots.constants";

interface MissionsItemPropType {
  type: number;
  level: number;
}

const MissionsItem = ({ level, type }: MissionsItemPropType) => {
  const isSmallScreen = window.innerHeight <= 520 ? true : false;

  const renderStorageItems = () => {
    return (
      <div
        className={clsx(
          "grid grid-cols-7 gap-3 bg-white rounded-2xl w-full",
          isSmallScreen ? "p-2" : " p-4",
          "dark:text-white dark:gradient-border-mask-mission-item dark:bg-transparent",
          "border-[1px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#97C35B]",
          "dark:border-0 dark:border-transparent dark:drop-shadow-none"
        )}
      >
        <div className="col-span-2 flex ">
          <img
            src={`/images/storage/${level + 1}.png`}
            width={60}
            alt="storage"
          ></img>
        </div>
        <div className="col-span-5">
          <p className="font-normal text-sm mb-2">{`Level ${level + 1}`}</p>
          <div className="flex gap-[7px] mb-2">
            <p className="text-base font-extrabold">{`Claim every ${bootsStorageLevel[level]?.duration}h`}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderTreeItems = () => {
    return (
      <div
        className={clsx(
          "grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full",
          "dark:text-white dark:gradient-border-mask-mission-item dark:bg-transparent",
          "border-[1px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#97C35B]",
          "dark:border-0 dark:border-transparent dark:drop-shadow-none"
        )}
      >
        <div className="col-span-2 flex ">
          <img src={`/images/trees/${level + 1}.png`} width={60} alt=""></img>
        </div>
        <div className="col-span-5">
          <p className="font-normal text-sm mb-2">{`Level ${level + 1}`}</p>
          <div className="flex gap-[7px] mb-2">
            <p className="text-base font-extrabold">{`Mine ${boostSpeedLevel[level]?.speed} SEED/hour`}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderWaterItems = () => {
    return (
      <div
        className={clsx(
          "grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full",
          "dark:text-white dark:gradient-border-mask-mission-item dark:bg-transparent",
          "border-[1px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#97C35B]",
          "dark:border-0 dark:border-transparent dark:drop-shadow-none"
        )}
      >
        <div className="col-span-2 flex ">
          <img src={`/images/holy/${level + 1}.png`} width={60} alt=""></img>
        </div>
        <div className="col-span-5">
          <p className="font-normal text-sm mb-2">{`Level ${level + 1}`}</p>
          <div className="flex gap-[7px] mb-2">
            <p className="text-base font-extrabold">{`x${boostWaterLevel[level]?.speed} per hour`}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (type === bootTypeEnum.STORAGE) {
      return renderStorageItems();
    }
    if (type === bootTypeEnum.SPEED) {
      return renderTreeItems();
    }
    if (type === bootTypeEnum.WATER) {
      return renderWaterItems();
    }
  };
  return <div>{renderContent()}</div>;
};

export default MissionsItem;
