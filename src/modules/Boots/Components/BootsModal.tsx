import MissionsItem from "./MissionsItem";
import { Button } from "@mui/material";
import clsx from "clsx";
import {
  boostSpeedLevel,
  bootTypeEnum,
  bootsStorageLevel,
} from "../../../constants/boots.constants";

interface ModalPropsType {
  isLoading: boolean;
  storageLevel: number;
  speedLevel: number;
  type: number;
  closeModal: () => void;
  handleUpgrade: () => void;
}

const BootsModal = ({ isLoading,
  closeModal,
  handleUpgrade,
  type,
  storageLevel,
  speedLevel,
}: ModalPropsType) => {
  const isDesktop = window.innerHeight < 610 ? true : false;

  const renderTitle = (type: number) => {
    if (type === 0) {
      return (
        <>
          <p className="text-[24px] font-bold">Storage</p>
          <p className="text-center font-normal">
            Increase the storage capacity
            <br />
            of the mined
          </p>
        </>
      );
    }
    if (type === 1) {
      return (
        <>
          <p className="text-[24px] font-bold">Tree</p>
          <p className="text-center font-normal">
            Increase passive mining speed.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="text-[24px] font-bold">Holy Water</p>
          <p className="text-center font-normal">
            Increase passive mining speed.
          </p>
        </>
      );
    }
  };

  const level = type === bootTypeEnum.STORAGE ? storageLevel : speedLevel;

  const price =
    type === bootTypeEnum.STORAGE ? bootsStorageLevel : boostSpeedLevel;

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed z-0 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-50"
      ></div>
      <div className="fixed py-4  bottom-0 left-0 flex flex-col items-center h-[85%] px-4 w-full rounded-t-2xl bg-gradient-to-b from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
        <div className="h-[5px] absolute -top-[14px] w-10 bg-white rounded-2xl"></div>
        <div className="overflow-auto w-full ">
          <div className="flex flex-col items-center ">{renderTitle(type)}</div>
          <div
            className={clsx(" mb-[26px] w-full", isDesktop ? "mt-3" : "mt-8")}
          >
            <MissionsItem type={type} level={level + 2} />
            <div className="flex justify-center">
              <img
                className={isDesktop ? "my-2" : "my-5"}
                src="/images/icons/uparrow.svg"
                width={21}
                height={28}
                alt="arrow"
              ></img>
            </div>
            <MissionsItem type={type} level={level + 1} />
          </div>
          <div className="flex justify-center gap-2 mb-[17px]">
            <img
              src="/images/icons/token_icon.svg"
              width={32}
              height={32}
              alt="token"
            ></img>
            <p className="text-[24px] font-bold">{price[String(level + 2)]?.price}</p>
          </div>
        </div>

        <Button
          onClick={() => handleUpgrade()}
          className=" fixed bottom-10 left-4 right-4 font-bold bg-gradient-to-r from-[#FBB500] to-[#FB2963] text-white py-[18px] rounded-xl drop-shadow-lg"
        >
          UPGRADE
        </Button>
      </div>
    </>
  );
};

export default BootsModal;
