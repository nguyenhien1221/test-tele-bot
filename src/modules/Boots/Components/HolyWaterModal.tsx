import MissionsItem from "./MissionsItem";
import clsx from "clsx";
import { boostWaterLevel } from "../../../constants/boots.constants";
import { LoadingButton } from "@mui/lab";
import Modal from "../../../components/common/Modal";

interface ModalPropsType {
  userData: any;
  isLoading: boolean;
  storageLevel: number;
  speedLevel: number;
  type: number;
  closeModal: () => void;
  handleOpenMission: () => void;
  handleUpgrade: () => void;
}

const HolyWaterModal = ({
  userData,
  isLoading,
  closeModal,
  handleOpenMission,
  handleUpgrade,
  type,
  storageLevel,
}: ModalPropsType) => {
  const isDesktop = window.innerHeight < 610;
  const isSmallScreen = window.innerHeight <= 520;

  const renderTitle = (type: number) => {
    if (type === 0) {
      return (
        <>
          <p className="text-[24px] font-bold">Storage</p>
          <p className="text-center font-normal">
            Extend the filled time to claim less often
          </p>
        </>
      );
    }
    if (type === 1) {
      return (
        <>
          <p className="text-[24px] font-bold">Tree</p>
          <p className="text-center font-normal">
            Increase passive planting speed
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="text-[24px] font-bold">Holy Water</p>
          <p className="text-center font-normal ">
            <span>
              Upgraded water boosts SEED planting. Planting speed is Tree{" "}
            </span>
            <i className="bx bx-x text-[15px]"></i> <span>Water</span>
          </p>
        </>
      );
    }
  };

  const renderButton = () => {
    const doneMission = userData?.filter(
      (item: any) =>
        item?.task_user != null && item?.task_user?.repeats >= item?.repeats
    );

    if (doneMission?.length > boostWaterLevel[storageLevel].missions) {
      return (
        <LoadingButton
          loading={isLoading}
          onClick={() => handleUpgrade()}
          className={clsx(
            "mt-4 capitalize text-[16px]  w-full font-bold text-white py-[18px] rounded-xl",
            "btn-hover  bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
          )}
        >
          Upgrade
        </LoadingButton>
      );
    }
    return (
      <div>
        <div className="flex relative z-30 justify-center gap-2 mb-[17px] dark:text-white">
          <p>Complete 1 mission to upgrade</p>
        </div>
        <LoadingButton
          loading={isLoading}
          onClick={() => handleOpenMission()}
          className={clsx(
            "capitalize text-[16px] w-full font-bold  text-white py-[18px] rounded-xl",
            "btn-hover  bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
          )}
        >
          Open missions
        </LoadingButton>
      </div>
    );
  };

  const level = storageLevel;

  return (
    <>
      <Modal closeModal={closeModal}>
        <div>
          <div className="overflow-auto w-full h-[calc(100%-90px)]">
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
          </div>
          <div className="h-[68px] ">{renderButton()}</div>
        </div>
      </Modal>
    </>
  );
};

export default HolyWaterModal;
