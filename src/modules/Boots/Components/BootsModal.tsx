import MissionsItem from "./MissionsItem";
import clsx from "clsx";
import {
  boostSpeedLevel,
  bootTypeEnum,
  bootsStorageLevel,
} from "../../../constants/boots.constants";
import { LoadingButton } from "@mui/lab";
import Modal from "../../../components/common/Modal";

interface ModalPropsType {
  isLoading: boolean;
  storageLevel: number;
  speedLevel: number;
  type: number;
  closeModal: () => void;
  handleUpgrade: () => void;
}

const BootsModal = ({
  isLoading,
  closeModal,
  handleUpgrade,
  type,
  storageLevel,
  speedLevel,
}: ModalPropsType) => {
  const isDesktop = window.innerHeight < 610 ? true : false;
  const isSmallScreen = window.innerHeight <= 520 ? true : false;

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
            Better water give you a multiplier to SEED mining. Mining speed is
            Storage Tree
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
      <Modal closeModal={closeModal}>
        <div>
          <div className="hidden dark:block absolute bottom-0 left-0 z-0">
            <img src="/images/darkmodebg.png" alt=""></img>
          </div>

          <div className="overflow-auto w-full h-[calc(100%-90px)] mb-7 ">
            <div
              className={clsx("flex flex-col items-center dark:text-white ")}
            >
              {renderTitle(type)}
            </div>
            <div
              className={clsx(
                "w-full",
                isDesktop ? "mt-3" : "mt-8",
                isSmallScreen ? "mb-4" : "mb-[26px]"
              )}
            >
              <MissionsItem type={type} level={level + 1} />
              <div className="flex justify-center">
                <img
                  className={clsx(
                    isDesktop ? "my-2" : "my-5",
                    "block dark:hidden"
                  )}
                  src="/images/icons/uparrow.svg"
                  width={21}
                  height={28}
                  alt="arrow"
                ></img>
                <img
                  className={clsx(
                    isDesktop ? "my-2" : "my-5",
                    "dark:block hidden"
                  )}
                  src="/images/icons/whiteuparrow.svg"
                  width={21}
                  height={28}
                  alt="arrow"
                ></img>
              </div>
              <MissionsItem type={type} level={level} />
            </div>
            <div className="flex relative z-30 justify-center gap-2 mb-[17px]">
              <img
                src="/images/icons/token_icon.png"
                width={32}
                height={32}
                alt="token"
              ></img>
              <p className="text-[24px] font-bold dark:text-white">
                {price[String(level + 1)]?.price}
              </p>
            </div>
          </div>
          <LoadingButton
            loading={isLoading}
            onClick={() => handleUpgrade()}
            className={clsx(
              "btn-slide-in capitalize  w-full font-bold  text-white py-[18px] rounded-xl",
              "dark:bg-white dark:text-black",
              "hover:drop-shadow-none bg-gradient-to-r from-[#97C35B] to-[#61A700]  border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B]",
              "dark:bg-none dark:border-0 dark:border-transparent dark:drop-shadow-sm"
            )}
          >
            Upgrade
          </LoadingButton>
        </div>
      </Modal>
    </>
  );
};

export default BootsModal;
