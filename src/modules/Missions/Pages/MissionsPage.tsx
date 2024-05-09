import { useState } from "react";
import {
  missionsTypes,
} from "../../../constants/missions.constants";
import MissionsModal from "../Components/MissionsModal";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import useGetMissions from "../Hooks/useGetMissions";
import {
  getMissionsByType,
  removeDuplicateItemsByType,
} from "../Utils/missions";
import useDoMissions from "../Hooks/useDoMissions";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../components/common/Loading";
import DailyMissonModal from "../Components/DailyMissonModal";
import useGetDailyMissions from "../Hooks/useGetDaily";
// import useDoDailyMissions from "../Hooks/useDoDaily";

const MissionsPage = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;

  const missionsData = useGetMissions();
  const doMission = useDoMissions();
  const dailyMissions = useGetDailyMissions()
  // const doDailyMission = useDoDailyMissions()

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const [isOpen, setisOpen] = useState({ isOpen: false, type: "" });
  const [isOpenDailyMission, setIsOpenDailyMission] = useState<any>({ isOpen: false, type: "", data: null });

  const isDesktop = window.innerHeight < 610 ? true : false;

  const handleChooseMission = (index: string) => {
    // const data = missionsData.data?.data.data;
    // if (index === missionsTypes.TWITTER_FOLLOW) {
    //   if (!data[data.length - 1]?.task_user?.completed) {
    //     handleDoMission(data[data.length - 1]?.id);
    //   }
    //   return;
    // }
    setisOpen({ isOpen: true, type: index });
  };

  const handleBackBtn = () => {
    navigate("/");
    setisOpen({ isOpen: false, type: "" });
  };

  const handleDoMission = (id: string) => {
    doMission
      .mutateAsync(id)
      .then(() => {
        toast.success("Mission completed", {
          style: { width: 237, borderRadius: 8 },
          autoClose: 2000,
        });
        missionsData.refetch();
      })
      .catch(() => {
        toast.error("mission is not completed", {
          style: { width: 237, borderRadius: 8 },
          autoClose: 2000,
        });
      });
  };

  const handleDoDailyMission = () => { }

  const missionGroup = removeDuplicateItemsByType(
    missionsData.data?.data.data ?? []
  ).filter((item) => item.type !== missionsTypes.SIGN_IN);

  return (
    <>
      {missionsData.isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-auto pt-[42px] px-4 relative h-screen bg-[#F2FFE0] dark:bg-transparent">
          <ToastContainer
            hideProgressBar
            limit={1}
            stacked
            className="top-3 w-[237px] left-[50%] -translate-x-[50%]"
          />
          {/* boot info */}
          <div className="flex flex-col items-center dark:text-white">
            <div className="flex flex-col items-center gap-3">
              <img
                src="/images/icons/token_icon.png"
                width={100}
                height={100}
                alt="token"
              ></img>
              <p className="text-[24px] font-extrabold">{`3 missions available`}</p>
            </div>
            <p className="text-sm font-normal">
              Complete the mission to get golden seed
            </p>
          </div>

          {/* options */}
          <div className={clsx(isDesktop ? "mt-2" : "mt-[49px]")}><div
            onClick={() => setIsOpenDailyMission({ isOpen: true, type: "", data: null })}
            
            className={clsx(
              "z-10 relative cursor-pointer grid grid-cols-10 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
              "dark:gradient-border-mask-mission dark:bg-transparent",
              "border-[3px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C]",
              "dark:boder-0 dark:drop-shadow-none dark:border-transparent"
            )}
          >
            <div className="col-span-2 flex items-center">
              <div>
                <img
                  src={`/images/icons/daily.png`}
                  width={48}
                  height={48}
                  alt="storage"
                ></img>
              </div>
            </div>
            <div className="col-span-6 flex items-center dark:text-white">
              <div className=" text-lg font-semibold">
                <p className="font-semibold">Login Bonus</p>
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div
                className={clsx(
                  "w-10 h-10 rounded-[50%] flex items-center justify-center",
                  "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C] bg-[#7BB52C]"
                )}
              >
                <p className="text-[24px] font-extrabold text-white">
                  {/* {countMission} */}
                </p>
              </div>
            </div>
          </div>
            {missionGroup.map((item, index) => {
              const countMission = getMissionsByType(
                item.type,
                missionsData.data?.data.data ?? []
              ).filter((mission: any) => mission.task_user === null).length;

              return (
                <div
                  onClick={() => handleChooseMission(item.type)}
                  key={index}
                  className={clsx(
                    "z-10 relative cursor-pointer grid grid-cols-10 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
                    "dark:gradient-border-mask-mission dark:bg-transparent",
                    "border-[3px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C]",
                    "dark:boder-0 dark:drop-shadow-none dark:border-transparent"
                  )}
                >
                  <div className="col-span-2 flex items-center">
                    <div>
                      <img
                        src={`/images/icons/${item.type}.png`}
                        width={48}
                        height={48}
                        alt="storage"
                      ></img>
                    </div>
                  </div>
                  <div className="col-span-6 flex items-center dark:text-white">
                    <div className=" text-lg font-semibold">
                      <p className="font-semibold">{item.name}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div
                      className={clsx(
                        "w-10 h-10 rounded-[50%] flex items-center justify-center",
                        "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C] bg-[#7BB52C]"
                      )}
                    >
                      <p className="text-[24px] font-extrabold text-white">
                        {countMission}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {isOpen.isOpen && (
            <MissionsModal
              handleDoMission={(id: string) => handleDoMission(id)}
              data={missionsData.data?.data.data ?? []}
              type={isOpen.type}
              closeModal={() => setisOpen({ isOpen: false, type: "" })}
              isOpen={isOpen.isOpen}
            ></MissionsModal>
          )}

          {isOpenDailyMission.isOpen && dailyMissions?.data && (
            <DailyMissonModal
              handleDoMission={(id: string) => handleDoMission(id)}
              data={dailyMissions?.data.data.data ?? []}
              type={isOpen.type}
              closeModal={() => setIsOpenDailyMission({ isOpen: false, type: "", data: null })}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MissionsPage;
