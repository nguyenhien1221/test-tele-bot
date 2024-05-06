/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { socials } from "../../../constants/missions.constants";
import { getMissionsByType } from "../Utils/missions";
import clsx from "clsx";
import { formatDecimals } from "../../../utils/formatNumber";
import { useState } from "react";

interface ModalPropsType {
  data: any;
  type: number;
  isOpen: boolean;
  closeModal: () => void;
  handleDoMission: (id: string) => void;
}

const MissionsModal = ({
  closeModal,
  type,
  data,
  handleDoMission,
}: ModalPropsType) => {
  const tele = window.Telegram.WebApp;
  const missions = getMissionsByType(type, data);
  const isSmallScreen = window.innerHeight <= 520 ? true : false;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleShowPopup = (item: any) => {
    tele.showPopup(
      {
        message: "Do you want to open link",
        buttons: [
          { id: "link", type: "default", text: "Open" },
          { type: "cancel" },
        ],
      },
      function (btn: any) {
        if (btn === "link") {
          if (!item?.task_user?.completed) {
            tele.openLink(item.metadata.url);
            setTimeout(() => {
              handleDoMission(item?.id);
              setIsLoading(false);
            }, 5000);
            return;
          }
          tele.openLink(item.metadata.url);
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed z-0 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-50"
      ></div>
      <div
        className={clsx(
          "slide-in fixed py-4 z-30 left-0 flex flex-col items-center px-4 w-full rounded-t-2xl bg-[#F2FFE0]",
          isSmallScreen ? "h-[90%]" : "h-[85%] max-h-[534px]",
          "dark:bg-[#0a0c0a] dark:shadow-[0_-2px_8px_#FFFFFF40]"
        )}
      >
        <div className="hidden dark:block absolute bottom-0 left-0 z-0">
          <img src="/images/darkmodebg.png" alt=""></img>
        </div>
        <div className="h-[5px] absolute -top-[14px] w-10 bg-white rounded-2xl"></div>
        <div className="dark:text-white">
          <div className=" w-full ">
            <div className="flex flex-col items-center ">
              <p className="text-[24px] font-bold">Follow on {socials[type]}</p>
              <p className="text-center font-normal">
                {`Every subscription +${formatDecimals(
                  missions[0].reward_amount
                )}
                 SEED.`}
                <br /> Tap to open {socials[type]} account.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-[34px] gap-y-4 mb-[38px] mt-[42px]">
            {missions?.map((item: any, index: number) => (
              <button
                disabled={isLoading}
                key={item.id}
                onClick={() => {
                  setIsLoading(true);
                  handleShowPopup(item);
                }}
                rel="noreferrer"
                className={clsx("text-center relative")}
              >
                {item.task_user != null && (
                  <img
                    className="absolute -right-3 z-10 -top-3"
                    src="/images/icons/checkmark.svg"
                    alt=""
                  ></img>
                )}
                <div
                  className={clsx(
                    "rounded-[16px] overflow-hidden",
                    "dark:gradient-border-mask-mission-item"
                  )}
                >
                  <img
                    className={clsx(
                      item.task_user?.completed ? "brightness-50" : "",
                      isSmallScreen ? "w-[65px]" : ""
                    )}
                    src={item?.metadata.image_url}
                    width={80}
                    alt="logo"
                  ></img>
                </div>
                <p className="mt-3 font-semibold text-sm">
                  {item?.metadata.name}
                </p>
              </button>
            ))}
          </div>
        </div>
        <Button
          onClick={closeModal}
          className={clsx(
            "btn-slide-in capitalize fixed w-[calc(100%-32px)] font-bold text-white py-[18px] rounded-xl ",
            "dark:bg-white dark:text-black dark:font-black",
            "bg-gradient-to-r from-[#97C35B] to-[#61A700]  border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B]"
          )}
        >
          got it
        </Button>
      </div>
    </>
  );
};

export default MissionsModal;
