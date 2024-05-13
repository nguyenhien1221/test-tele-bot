/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { missionsTypes } from "../../../constants/missions.constants";
import { getMissionsByType } from "../Utils/missions";
import clsx from "clsx";
import { formatDecimals } from "../../../utils/formatNumber";
import { useState } from "react";
import Modal from "../../../components/common/Modal";
import { getMobileOS } from "../../../utils/helper";

interface ModalPropsType {
  data: any;
  type: string;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleShowPopup = (item: any, url: string) => {
    tele.showPopup(
      {
        message: `Do you want to open twitter ${item.metadata.name}}`,
        buttons: [
          { id: "link", type: "default", text: "Open" },
          { type: "cancel" },
        ],
      },
      function (btn: any) {
        if (btn === "link") {
          if (!item?.task_user?.completed) {
            tele.openLink(
              item.type === "twitter-follow" ? url : item.metadata.url
            );
            setTimeout(() => {
              handleDoMission(item?.id);
              setIsLoading(false);
            }, 5000);
            return;
          }
          tele.openLink(
            item.type === "twitter-follow" ? url : item.metadata.url
          );
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  const handleOpenLink = (item: any) => {
    if (!item?.task_user?.completed) {
      setTimeout(() => {
        handleDoMission(item?.id);
        setIsLoading(false);
      }, 2000);
      return;
    }
  };

  const renderModalTitle = () => {
    switch (type) {
      case missionsTypes.TELEGRAM__JOIN:
        return "Join Telegram";
      case missionsTypes.TWITTER_FOLLOW:
        return "Follow on Twitter";
      case missionsTypes.DAILY:
        return "Login bonus!";
    }
  };

  return (
    <>
      <Modal closeModal={closeModal}>
        <div className="dark:text-white w-full overflow-auto flex flex-col h-[calc(100%-32px)]">
          <div className=" w-full ">
            <div className="flex flex-col items-center ">
              <p className="text-[24px] font-bold">{renderModalTitle()}</p>
            </div>
          </div>

          <div className="pt-[30px] max-h-[400px] overflow-auto flex-1">
            {missions
              ?.sort((a: any, b: any) => {
                if (a.task_user === null && b.task_user !== null) {
                  return -1; // a comes first if it has null value
                } else if (a.task_user !== null && b.task_user === null) {
                  return 1; // b comes first if it has null value
                } else {
                  return 0; // otherwise, maintain current order
                }
              })
              .map((item: any, index: number) => {
                const twitterUrl = () => {
                  if (
                    getMobileOS() === "Android" &&
                    item.type === "twitter-follow"
                  ) {
                    return item.metadata?.url;
                  } else if (
                    getMobileOS() === "iOS" &&
                    item.type === "twitter-follow"
                  ) {
                    return item.metadata?.ios_url;
                  }
                };

                return item.type === "twitter-follow" ? (
                  <button
                    disabled={isLoading}
                    key={item.id}
                    onClick={() => {
                      setIsLoading(true);
                      handleShowPopup(item, twitterUrl());
                    }}
                    rel="noreferrer"
                    className={clsx("text-center relative w-full")}
                  >
                    {item.task_user != null && (
                      <div
                        className={clsx(
                          "w-[30px] h-[30px] rounded-[50%] flex items-center justify-center absolute right-4 -top-4 z-20",
                          "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C] bg-[#7BB52C]"
                        )}
                      >
                        <img
                          src="/images/icons/checkmission.png"
                          className="w-[13px] h-[9px]"
                          alt=""
                        ></img>
                      </div>
                    )}
                    <div
                      key={index}
                      className={clsx(
                        "z-10 py-3 px-4 relative cursor-pointer grid grid-cols-12 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
                        "dark:gradient-border-mask-mission dark:bg-transparent",
                        "dark:boder-0 dark:drop-shadow-none dark:border-transparent",
                        item.task_user?.completed
                          ? "border-[1px] border-solid border-[#000] drop-shadow-none brightness-50"
                          : "border-[3px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C]"
                      )}
                    >
                      <div className="col-span-2 flex items-center">
                        <div className="rounded-lg drop-shadow-lg overflow-hidden w-8 h-8">
                          <img
                            src={item.metadata.image_url}
                            className="w-8 h-8"
                            alt=""
                          ></img>
                        </div>
                      </div>

                      <div className="col-span-7 flex items-center text-start justify-start text-[15px]">
                        {item.name}
                      </div>
                      <div className="col-span-3 flex items-center justify-start">
                        <img
                          src="/images/icons/token_icon.png"
                          className="w-4 h-4"
                          alt=""
                        ></img>
                        <span className="font-semibold text-sm ml-1">{`+${formatDecimals(
                          item.reward_amount ?? 0
                        )}`}</span>
                      </div>
                    </div>
                  </button>
                ) : (
                  <a
                    href={item?.metadata?.url}
                    target="blank"
                    key={item?.id}
                    onClick={() => {
                      setIsLoading(true);
                      handleOpenLink(item);
                    }}
                    rel="noreferrer"
                    className={clsx("text-center relative w-full")}
                  >
                    {item.task_user != null && (
                      <div
                        className={clsx(
                          "w-[30px] h-[30px] rounded-[50%] flex items-center justify-center absolute right-4 -top-4 z-20",
                          "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C] bg-[#7BB52C]"
                        )}
                      >
                        <img
                          src="/images/icons/checkmission.png"
                          className="w-[13px] h-[9px]"
                          alt=""
                        ></img>
                      </div>
                    )}
                    <div
                      key={index}
                      className={clsx(
                        "z-10 py-3 px-4 relative cursor-pointer grid grid-cols-12 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
                        "dark:gradient-border-mask-mission dark:bg-transparent",
                        "dark:boder-0 dark:drop-shadow-none dark:border-transparent",
                        item.task_user?.completed
                          ? "border-[1px] border-solid border-[#000] drop-shadow-none brightness-50"
                          : "border-[3px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C]"
                      )}
                    >
                      <div className="col-span-2 flex items-center">
                        <div className="rounded-lg drop-shadow-lg overflow-hidden w-8 h-8">
                          <img
                            src={item.metadata.image_url}
                            className="w-8 h-8"
                            alt=""
                          ></img>
                        </div>
                      </div>

                      <div className="col-span-7 flex items-center text-start justify-start text-[15px]">
                        {item.name}
                      </div>
                      <div className="col-span-3 flex items-center justify-start">
                        <img
                          src="/images/icons/token_icon.png"
                          className="w-4 h-4"
                          alt=""
                        ></img>
                        <span className="font-semibold text-sm ml-1">{`+${formatDecimals(
                          item.reward_amount ?? 0
                        )}`}</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            <div
              className={clsx(
                " py-3 px-4 relative cursor-pointer bg-white rounded-2xl p-4 w-full mb-[18px] ",
                "dark:gradient-border-mask-mission dark:bg-transparent",
                "dark:boder-0 dark:drop-shadow-none dark:border-transparent",
                "border-[1px] border-[#C2C2C2] border-solid drop-shadow-[0_4px_0px_#4D7F0C]"
              )}
            >
              <div className="text-[15px] font-semibold">Coming soon...</div>
              <div className="text-sm font-normal text-[#000] opacity-60 dark:text-white">
                Follow the news so you don't miss new missions!
              </div>
            </div>
          </div>
          <div className="pt-3 h-[85px]">
            <Button
              onClick={closeModal}
              className={clsx(
                "capitalize text-[16px]  w-full font-bold text-white py-[18px] rounded-xl ",
                "dark:bg-white dark:text-black dark:font-black",
                "hover:drop-shadow-none bg-gradient-to-r from-[#97C35B] to-[#61A700]  border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B]",
                "dark:boder-0 dark:border-transparent dark:bg-none dark:drop-shadow-none"
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

export default MissionsModal;
