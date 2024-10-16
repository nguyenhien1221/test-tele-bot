/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import Modal from "../../../components/common/Modal";
import { Button } from "@mui/material";
// import { Slide, ToastContainer } from "react-toastify";
import { formatDecimals } from "../../../utils/formatNumber";
import Loading from "../../../components/common/Loading";
import { dailyBonusValue } from "../../../constants/missions.constants";

interface ModalPropsType {
  isLoading: boolean;
  data: any;
  closeModal: () => void;
  handleDoMission: () => void;
}

const DailyMissonModal = ({
  closeModal,
  data,
  handleDoMission,
  isLoading,
}: ModalPropsType) => {
  const claimed = (no: number) => {
    if (!data || !data?.length) {
      return false;
    }

    return data.some((v: { no: number }) => v.no === no);
  };

  const unlocked = (no: number) => {
    if (!data || !data?.length) {
      return no === 1;
    }

    // data.length is the number of days claimed.
    // claimed means the reward is already unlocked;
    if (no <= data?.length) {
      return true;
    }

    // suppose the last claim days is n. then n+2 should be locked
    if (no > data?.length + 1) {
      return false;
    }

    // now compare the last claim; if last claim on yesterday or before that, today reward is unlocked;
    const lastClaim = new Date(data[0].timestamp);
    const truncatedLastClaim = new Date(
      lastClaim.getUTCFullYear(),
      lastClaim.getUTCMonth(),
      lastClaim.getUTCDate()
    );

    const now = new Date();
    const truncatedNow = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );

    return truncatedLastClaim.getTime() < truncatedNow.getTime();
  };

  const getWeekDays = (weekNumber: number) => {
    const startDayOfWeek = (weekNumber - 1) * 7 + 1;
    return Array.from({ length: 7 }, (_, i) => startDayOfWeek + i);
  };

  const updateDaysOfWeek = () => {
    const curentDay =
      data?.reduce(
        (prev: any, current: any) => (prev.no > current.no ? prev : current),
        0
      ).no ?? 0;

    let weekNumber = Math.floor(curentDay / 7) + 1;
    const curentWeekDays = getWeekDays(weekNumber);
    const maxDayOfWeek = Math.max(...curentWeekDays);

    // if claim the last day of this week, but day hasnt passed yet, render current week
    // maxDayOfWeek - 6 to get first day of next week, so make the func unlocked always compare lastclaim vs now
    if (curentDay === maxDayOfWeek - 7 && !unlocked(maxDayOfWeek - 6)) {
      weekNumber--;
      return getWeekDays(weekNumber);
    }

    return curentWeekDays;
  };

  return (
    <>
      <Modal closeModal={closeModal}>
        {/* <ToastContainer
          position="top-left"
          closeOnClick
          transition={Slide}
          hideProgressBar
          limit={1}
          stacked
          className="top-3 max-w-[337px] left-[50%] -translate-x-[50%]"
        /> */}
        <div className="flex flex-col h-full ">
          <div className="w-full ">
            <div className="flex flex-col items-center dark:text-white">
              <p className="text-[24px] font-bold">Login Bonus!</p>
              <p className="text-center">
                Login every day to claim your rewards!
              </p>
            </div>
          </div>
          {isLoading && (
            <div className="bg-black w-screen opacity-[0.5] fixed z-40 left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
              <Loading />
            </div>
          )}
          <div className="grid grid-cols-3 gap-x-4 gap-y-0 pt-5 max-h-[340px] flex-1 px-2 overflow-auto">
            {/* row 1 */}
            {updateDaysOfWeek().map((day: any, index: number) => {
              return (
                <button
                  key={index}
                  onClick={() => handleDoMission()}
                  className={clsx(
                    "btn-hover dark:btn-click w-full h-[120px] pt-[22px] relative cursor-pointer bg-white rounded-[16px] mb-[18px] flex items-center justify-center",
                    "dark:gradient-border-mask dark:bg-transparent dark:drop-shadow-none dark:border-[#fff]",
                    "border-[3px] border-solid drop-shadow-[0_4px_0px_#4D7F0C]",
                    unlocked(day) ? "border-[#B0D381]" : "border-[#00000080]",
                    claimed(day) || !unlocked(day) ? "pointer-events-none" : "",
                    index === 6 ? "col-span-3" : ""
                  )}
                >
                  {claimed(day) && (
                    <div
                      className={clsx(
                        "w-[30px] h-[30px] rounded-[50%] flex items-center justify-center absolute -right-2 -top-4 z-30"
                      )}
                    >
                      <img
                        src="/images/holy/check_mark.png"
                        className="w-[31px] h-[31px]"
                        alt=""
                      ></img>
                    </div>
                  )}
                  {!unlocked(day) && (
                    <div className="absolute z-40 w-full h-full top-0 ">
                      <div className="absolute z-10 bg-black bg-opacity-50 w-full h-full rounded-[13px]"></div>
                      <img
                        src="/images/daily/lock.svg"
                        className="z-50 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
                        alt=""
                      ></img>
                    </div>
                  )}
                  <div className="absolute text-[11px] font-semibold left-0 top-0  text-white w-[60px] flex items-center h-[19px] bg-[#4E800D] px-[10px] rounded-br-xl rounded-tl-[12px]">
                    {`Day ${day}`}
                  </div>
                  <div>
                    <img
                      src={`/images/daily/${index + 1}.png`}
                      className="w-[55%] h-[80%] mx-auto"
                      alt=""
                    ></img>
                    <p className="font-semibold dark:text-white text-center">
                      {formatDecimals(dailyBonusValue[index])}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <Button
              onClick={closeModal}
              className={clsx(
                "capitalize text-[16px] w-full font-bold text-white py-[18px] rounded-xl ",
                "btn-hover dark:btn-click bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
              )}
            >
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DailyMissonModal;
