import MissionsItem from "./MissionsItem";
import clsx from "clsx";
import {
  boostSpeedLevel,
  bootTypeEnum,
  bootsStorageLevel,
} from "../../../constants/boots.constants";
import { LoadingButton } from "@mui/lab";
import { useRef } from "react";

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

  const modalRef = useRef<any>();
  const pageRef = useRef<any>();
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

  let startY: number | null = null;
  let startHeight: number | null = null;

  const getMouseDown = (clientY: any) => {
    startY = clientY;
    console.log(clientY);
    if (modalRef?.current) {
      startHeight = modalRef?.current?.offsetHeight as number;
    }
    if (pageRef?.current) {
      pageRef.current.style = "pointer-events: auto";
    }
  };

  const getMouseUp = () => {
    startY = null;
    startHeight = null;
    if (pageRef?.current) {
      pageRef.current.style = "pointer-events: none";
    }
  };
  const resizeChart = (clientY: number) => {
    console.log(clientY);
    if (startY !== null && modalRef?.current && startHeight !== null) {
      const distance = startY - clientY;
      modalRef.current.style = `height: ${startHeight + distance + "px"}`;
      if (
        typeof window !== undefined &&
        window?.innerHeight - clientY <= window?.innerHeight * 0.15
      ) {
        getMouseUp();
        modalRef.current.style = `height: 0px`;
      }
    }
  };
  return (
    <>
      <div
        ref={pageRef}
        style={{ pointerEvents: "none" }}
        className="fixed w-[100vw] h-[100vh] top-0 left-0 cursor-ns-resize z-[100]"
        onMouseMove={(e) => resizeChart(e?.clientY)}
        onTouchMove={(e) => {
          console.log(e);
          resizeChart(
            e?.changedTouches?.[e?.changedTouches?.length - 1]?.clientY
          );
        }}
        onMouseUpCapture={() => getMouseUp()}
        onTouchEnd={() => getMouseUp()}
      />
      <div
        onClick={closeModal}
        className="fixed z-10 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-50"
      ></div>
      <div
        onMouseUpCapture={() => getMouseUp()}
        onTouchEnd={() => getMouseUp()}
        ref={modalRef}
        className={clsx(
          "slide-in fixed py-4 pb-[20] px-4 z-30 left-0 flex flex-col items-center  w-full rounded-t-2xl bg-[#F2FFE0]",
          // isSmallScreen ? "h-[90%]" : "h-[90%] max-h-[567px]",
          "dark:bg-[#0a0c0a] dark:shadow-[0_-2px_8px_#FFFFFF40]"
        )}
        style={{ height: "90%" }}
      >
        <div className="hidden dark:block absolute bottom-0 left-0 z-0">
          <img src="/images/darkmodebg.png" alt=""></img>
        </div>
        <div
          onMouseDownCapture={(e) => getMouseDown(e?.clientY)}
          onTouchStartCapture={(e) =>
            getMouseDown(
              e?.changedTouches?.[e?.changedTouches?.length - 1]?.clientY
            )
          }
          className="h-[5px] absolute -top-[14px] w-10 bg-white rounded-2xl"
        ></div>
        <div className="overflow-auto w-full h-[calc(100%-90px)]  ">
          <div className={clsx("flex flex-col items-center dark:text-white ")}>
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
            "btn-slide-in capitalize fixed left-4 right-4 font-bold  text-white py-[18px] rounded-xl",
            "dark:bg-white dark:text-black",
            "hover:drop-shadow-none bg-gradient-to-r from-[#97C35B] to-[#61A700]  border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B]",
            "dark:bg-none dark:border-0 dark:border-transparent dark:drop-shadow-sm"
          )}
        >
          Upgrade
        </LoadingButton>
      </div>
    </>
  );
};

export default BootsModal;
