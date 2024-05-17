/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import Modal from "../../../components/common/Modal";
import Loading from "../../../components/common/Loading";

interface ModalPropsType {
  isPending: boolean;
  data: any;
  closeModal: () => void;
  handleDoMission: (id: string) => void;
  closeWaterMissionModal: () => void;
}

const WaterMissionsModal = ({
  isPending,
  data,
  closeModal,
  handleDoMission,
  closeWaterMissionModal,
}: ModalPropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitMission = (item: any) => {
    setIsLoading(true);
    setTimeout(() => {
      handleDoMission(item);
      setIsLoading(false);
    }, 2000);
  };

  const isDone = data.filter((item: any) => item.task_user === null);

  return (
    <>
      <Modal closeModal={closeModal}>
        <div className="dark:text-white w-full overflow-auto flex flex-col h-[calc(100%-32px)]">
          <div className=" w-full">
            <button
              onClick={closeWaterMissionModal}
              className={clsx(
                "absolute left-0 top-0 text-xl flex items-center justify-center text-[25px]",
                "capitalize font-bold text-white rounded-xl w-8 h-8 p-0",
                "btn-hover  bg-gradient-to-r from-[#97C35B] to-[#61A700]    drop-shadow-[0_4px_0px_#4C7E0B]"
              )}
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            <div className="flex flex-col items-center ">
              <p className="text-[24px] font-bold">{`${isDone.length} Missions Available`}</p>
              <p className="text-center text-[15px]">
                Each mission will give you new levels. You can complete the
                missions in any order.
              </p>
            </div>
          </div>
          {isPending ? (
            <Loading />
          ) : (
            <div className="pt-[20px] max-h-[340px] flex-1 overflow-auto">
              {data
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
                  return (
                    <button
                      disabled={isLoading}
                      key={item.id}
                      onClick={() => {
                        handleSubmitMission(item);
                      }}
                      rel="noreferrer"
                      className={clsx("text-center relative w-full mt-1")}
                    >
                      {item.task_user != null && (
                        <div
                          className={clsx(
                            "flex items-center justify-center absolute right-4 -top-4 z-20"
                          )}
                        >
                          <img
                            src="/images/holy/check_mark.png"
                            className="w-[29px] h-[31px]"
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
                          item.task_user
                            ? "border-[1px] border-solid border-[#000] drop-shadow-none brightness-50"
                            : "border-[1px] border-[#4D7F0C] border-solid drop-shadow-[0_4px_0px_#4D7F0C]"
                        )}
                      >
                        <div className="col-span-10 flex">
                          <div className=" flex items-center mr-4">
                            <img
                              src={`/images/holy/${item.type}.png`}
                              className="w-8 h-8"
                              alt=""
                            ></img>
                          </div>

                          <div className=" flex items-center justify-start text-start text-[15px]">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

              <div
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
              </div>
            </div>
          )}

          <div className="pt-3 pb-1">
            <Button
              onClick={closeModal}
              className={clsx(
                "capitalize w-full font-bold text-white py-[18px] rounded-xl ",
                "btn-hover  bg-gradient-to-r from-[#97C35B] to-[#61A700] shadow-[0_4px_0px_#4C7E0B]"
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

export default WaterMissionsModal;
