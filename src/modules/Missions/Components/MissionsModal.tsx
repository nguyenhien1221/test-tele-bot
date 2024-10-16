/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { missionsTypes } from "../../../constants/missions.constants";
import clsx from "clsx";
import { formatDecimals } from "../../../utils/formatNumber";
import { useState } from "react";
import Modal from "../../../components/common/Modal";
import { getMobileOS } from "../../../utils/helper";
import ItemLoading from "../../../components/common/ItemLoading";
import TeleMissionItem from "./TeleMissionItem";

interface ModalPropsType {
  missions: any[];
  type: string;
  isOpen: boolean;
  closeModal: () => void;
  handleDoMission: (id: string) => void;
  isLoading: boolean;
  reFetch: () => void;
}

const MissionsModal = ({
  closeModal,
  type,
  missions,
  handleDoMission,
  isLoading,
  reFetch,
}: ModalPropsType) => {
  const tele = window.Telegram.WebApp;
  const [loadingItem, setLoadingItem] = useState("");

  const handleShowPopup = (item: any, url: string) => {
    setLoadingItem(item.id);
    tele.showPopup(
      {
        message: `Do you want to open ${item.metadata.name}`,
        buttons: [
          { id: "link", type: "default", text: "Open" },
          { type: "cancel" },
        ],
      },
      async function (btn: any) {
        if (btn === "link") {
          if (item?.task_user === null || !item?.task_user?.completed) {
            tele.openLink(
              item.type === missionsTypes.TWITTER_FOLLOW
                ? url
                : item.metadata.url
            );
            await new Promise((r) => setTimeout(r, 3000));
            handleDoMission(item);
            return;
          }
          tele.openLink(
            item.type === missionsTypes.TWITTER_FOLLOW ? url : item.metadata.url
          );
        } else {
        }
      }
    );
  };

  const handleClickMissionOthers = (item: any) => {
    setLoadingItem(item.id);
    handleDoMission(item);
  };

  // const handleOpenLink = (item: any) => {
  //   setLoadingItem(item.id);
  //   if (!item?.task_user?.completed) {
  //     // tele.openTelegramLink(item?.metadata?.url);
  //     handleDoMission(item?.id);
  //     return;
  //   }
  //   tele.openTelegramLink(item?.metadata?.url);
  // };

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
        <div className="dark:text-white w-full flex flex-col h-[calc(100%-32px)]">
          <div className=" w-full ">
            <div className="flex flex-col items-center ">
              <p className="text-[24px] font-bold">{renderModalTitle()}</p>
            </div>
          </div>

          <div className="pt-[30px] max-h-[400px] flex-1 overflow-auto">
            {missions
              ?.sort((a: any, b: any) => {
                const isACompleted =
                  a.task_user !== null && a.task_user.repeats >= a.repeats;
                const isBCompelted =
                  b.task_user !== null && b.task_user.repeats >= b.repeats;
                if (!isACompleted && isBCompelted) {
                  return -1; // a comes first if it has null value
                } else if (isACompleted && !isBCompelted) {
                  return 1; // b comes first if it has null value
                } else {
                  return 0; // otherwise, maintain current order
                }
              })
              .map((item: any, index: number) => {
                const twitterUrl = () => {
                  if (
                    getMobileOS() === "Android" &&
                    item.type === missionsTypes.TWITTER_FOLLOW
                  ) {
                    return item.metadata?.url;
                  } else if (
                    getMobileOS() === "iOS" &&
                    item.type === missionsTypes.TWITTER_FOLLOW
                  ) {
                    return item.metadata?.ios_url;
                  } else {
                    return item.metadata?.url;
                  }
                };

                if (item.type === missionsTypes.TWITTER_FOLLOW) {
                  return (
                    <button
                      disabled={isLoading}
                      key={item.id}
                      onClick={() => {
                        handleShowPopup(item, twitterUrl());
                      }}
                      rel="noreferrer"
                      className={clsx("text-center relative w-full mt-1")}
                    >
                      {item.task_user != null &&
                        (item.task_user.repeats || 0 >= item.repeats) && (
                          <div
                            className={clsx(
                              "w-[30px] h-[30px] rounded-[50%] flex items-center justify-center absolute right-4 -top-4 z-20"
                            )}
                          >
                            <img
                              src="/images/holy/check_mark.png"
                              className="w-[31px] h-[31px]"
                              alt=""
                            ></img>
                          </div>
                        )}
                      <div
                        key={index}
                        className={clsx(
                          "z-10 py-3 px-4 relative cursor-pointer grid grid-cols-12 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
                          "dark:gradient-border-mask-mission dark:bg-transparent",
                          " dark:drop-shadow-none ",
                          item.task_user?.repeats || 0 >= item.repeats
                            ? "border-[1px] border-solid border-[#000] drop-shadow-none brightness-50"
                            : "border-[1px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C] btn-hover dark:btn-click"
                        )}
                      >
                        <div className="col-span-9 flex">
                          <div className=" flex items-center mr-4">
                            <div className="rounded-lg drop-shadow-lg overflow-hidden w-8 h-8">
                              <img
                                src={item.metadata.image_url}
                                className="w-8 h-8"
                                alt=""
                              ></img>
                            </div>
                          </div>

                          <div className=" flex items-center text-start justify-start text-[15px]">
                            {item.name}
                          </div>
                        </div>
                        <div className="col-span-3 flex items-center justify-start">
                          {isLoading &&
                          item.id === loadingItem &&
                          !item?.task_user?.completed ? (
                            <ItemLoading />
                          ) : (
                            <>
                              <img
                                src="/images/icons/token_icon.png?v=3"
                                className="w-4 h-4"
                                alt=""
                              ></img>
                              <span className="font-semibold text-sm ml-1">{`+${formatDecimals(
                                item.reward_amount ?? 0
                              )}`}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                }

                if (item.type === missionsTypes.TELEGRAM__JOIN) {
                  return (
                    <TeleMissionItem
                      key={item.id}
                      item={item}
                      reFetch={() => reFetch()}
                    />
                  );
                }

                return (
                  <button
                    disabled={isLoading}
                    key={item.id}
                    onClick={() => {
                      handleClickMissionOthers(item);
                    }}
                    rel="noreferrer"
                    className={clsx("text-center relative w-full mt-1")}
                  >
                    {item.task_user != null &&
                      (item.task_user.repeats || 0 >= item.repeats) && (
                        <div
                          className={clsx(
                            "w-[30px] h-[30px] rounded-[50%] flex items-center justify-center absolute right-4 -top-4 z-20"
                          )}
                        >
                          <img
                            src="/images/holy/check_mark.png"
                            className="w-[31px] h-[31px]"
                            alt=""
                          ></img>
                        </div>
                      )}
                    <div
                      key={index}
                      className={clsx(
                        "z-10 py-3 px-4 relative cursor-pointer grid grid-cols-12 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
                        "dark:gradient-border-mask-mission dark:bg-transparent",
                        " dark:drop-shadow-none ",
                        item.task_user?.repeats || 0 >= item.repeats
                          ? "border-[1px] border-solid border-[#000] drop-shadow-none brightness-50"
                          : "border-[1px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C] btn-hover dark:btn-click"
                      )}
                    >
                      <div className="col-span-9 flex">
                        <div className=" flex items-center mr-4">
                          <div className="rounded-lg drop-shadow-lg overflow-hidden w-8 h-8">
                            <img
                              src={item.metadata.image_url}
                              className="w-8 h-8"
                              alt=""
                            ></img>
                          </div>
                        </div>

                        <div className=" flex items-center text-start justify-start text-[15px]">
                          {item.name}
                        </div>
                      </div>
                      <div className="col-span-3 flex items-center justify-start">
                        {isLoading &&
                        item.id === loadingItem &&
                        !item?.task_user?.completed ? (
                          <ItemLoading />
                        ) : (
                          <>
                            <img
                              src="/images/icons/token_icon.png?v=3"
                              className="w-4 h-4"
                              alt=""
                            ></img>
                            <span className="font-semibold text-sm ml-1">{`+${formatDecimals(
                              item.reward_amount ?? 0
                            )}`}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            {/* <div
              className={clsx(
                "py-3 px-4 relative bg-white rounded-2xl p-4 w-full mb-[18px] ",
                "dark:boder-1 dark:border-[#fff] dark:bg-transparent",
                "border-[1px] border-[#C2C2C2] border-solid"
              )}
            >
              <div className="text-[15px] font-semibold">Coming soon...</div>
              <div className="text-sm font-normal text-[#000] opacity-60 dark:text-white">
                Follow the news so you don't miss new missions!
              </div>
            </div> */}
          </div>

          <div className="pt-3 pb-1 h-[80px]">
            <Button
              onClick={closeModal}
              className={clsx(
                "capitalize text-[16px]  w-full font-bold text-white py-[18px] rounded-xl ",
                "btn-hover dark:btn-click  bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
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
