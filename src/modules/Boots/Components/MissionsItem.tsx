import clsx from "clsx";
import {
  boostSpeedLevel,
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
          "grid grid-cols-7 gap-3 bg-white rounded-2xl w-full drop-shadow-lg",
          isSmallScreen ? "p-2" : " p-4"
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
      <div className="grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full drop-shadow-lg">
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
  return (
    <div>
      {type === bootTypeEnum.STORAGE ? renderStorageItems() : renderTreeItems()}
    </div>
  );
};

export default MissionsItem;
