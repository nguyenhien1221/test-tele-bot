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
  const isSmallScreen = window.innerHeight <= 520;

  const renderStorageItems = () => {
    return (
      <div
        className={clsx(
          "grid grid-cols-7 gap-0 bg-white rounded-2xl w-full",
          isSmallScreen ? "p-2" : " p-4",
          "dark:text-white dark:gradient-border-mask-mission-item dark:bg-transparent dark:drop-shadow-none",
          "border-[1px] border-[#4D7F0C] border-solid drop-shadow-[0_4px_0px_#4D7F0C]"
        )}
      >
        <div className="col-span-2 flex ">
          <img
            src={`/images/storage/${level + 1}.png`}
            width={60}
            alt="storage"
          ></img>
        </div>
        <div className="col-span-5 flex flex-col justify-center items-start">
          <p className="font-semibold text-base mb-2">{`Level ${level + 1}`}</p>
          <div className="flex gap-[7px] ">
            <p className="text-sm ">{`Claim every ${bootsStorageLevel[level]?.duration}h`}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderTreeItems = () => {
    return (
      <div
        className={clsx(
          "grid grid-cols-7 gap-3 bg-white rounded-2xl w-full",
          isSmallScreen ? "p-2" : " p-4",
          "dark:text-white dark:gradient-border-mask-mission-item dark:bg-transparent dark:drop-shadow-none",
          "border-[1px] border-[#4D7F0C] border-solid drop-shadow-[0_4px_0px_#4D7F0C]"
        )}
      >
        <div className="col-span-2 flex ">
          <img src={`/images/trees/${level + 1}.png`} width={60} alt=""></img>
        </div>
        <div className="col-span-5 flex flex-col justify-center items-start">
          <p className="font-semibold text-base mb-2">{`Level ${level + 1}`}</p>
          <div className="flex gap-[7px] ">
            <p className="text-sm">{`Mine ${boostSpeedLevel[level]?.speed} SEED/hour`}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderWaterItems = () => {
    return (
      <div
        className={clsx(
          "grid grid-cols-9 gap-3 bg-white rounded-2xl  w-full",
          isSmallScreen ? "p-2" : " p-4",
          "dark:text-white dark:gradient-border-mask-mission-item dark:bg-transparent dark:drop-shadow-none",
          "border-[1px] border-[#4D7F0C] border-solid drop-shadow-[0_4px_0px_#4D7F0C]"
        )}
      >
        <div className="col-span-2 flex ">
          <img
            src={`/images/holy/${level + 1}.png`}
            className="h-[60px] w-[50px]"
            width={60}
            alt=""
          ></img> 
        </div>
        <div className="col-span-7 flex items-start flex-col justify-center">
          <p className="font-semibold text-base mb-2">{`Level ${level + 1}`}</p>
          <div className="flex gap-[7px] ">
            <p className="text-sm">{`x${boostWaterLevel[level]?.speed} per hour`}</p>
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
