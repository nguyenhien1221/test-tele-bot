import { useEffect, useState } from "react";
import { missionsTypes } from "../../../constants/missions.constants";
import MissionsModal from "../Components/MissionsModal";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import useGetMissions from "../Hooks/useGetMissions";
import {
  getMissionsByType,
  removeDuplicateItemsByType,
} from "../Utils/missions";
import useDoMissions from "../Hooks/useDoMissions";
import { Slide, ToastContainer, toast } from "react-toastify";
import Loading from "../../../components/common/Loading";
import DailyMissonModal from "../Components/DailyMissonModal";
import useGetDailyMissions from "../Hooks/useGetDaily";
import useDoDailyMissions from "../Hooks/useDoDaily";
import { checkSameDay } from "../../../utils/helper";
import Progress from "../../../components/common/Progress";
import useGetMissionsStatus from "../Hooks/useGetMissionStatus";

const MissionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;
  const missionsData = useGetMissions();
  const doMission = useDoMissions();
  const dailyMissions = useGetDailyMissions();
  const doDailyMission = useDoDailyMissions();


  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const [isOpen, setisOpen] = useState({ isOpen: false, type: "" });
  const [isOpenDailyMission, setIsOpenDailyMission] = useState<any>({
    isOpen: location?.state?.isOpenDailyModal ?? false,
    type: "",
    data: null,
  });
  const [missionsId, setMissionId] = useState("")

  const isDesktop = window.innerHeight < 610;


  const getMissionStatus = useGetMissionsStatus(String(missionsId))

  useEffect(() => {
    getMissionStatus.refetch()
  }, [missionsId])

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
      .then((data) => {
        const missisonId = data?.data?.data
        setMissionId(missisonId)
      })
      .then(() => { 
        if (!!getMissionStatus.data?.data.data.completed) {
          toast.success("Mission completed", {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
        } else {
          toast.error(getMissionStatus.data?.data.data?.error, {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
        }
        missionsData.refetch();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          style: { maxWidth: 337, height: 40, borderRadius: 8 },
          autoClose: 2000,
        });
      });
  };

  const handleDoDailyMission = () => {
    doDailyMission
      .mutateAsync()
      .then(() => {
        toast.success("Mission completed", {
          style: { maxWidth: 337, height: 40, borderRadius: 8 },
          autoClose: 2000,
        });
        dailyMissions.refetch();
      })
      .catch((err) => {
        toast.error(err?.respone?.data?.message, {
          style: { maxWidth: 337, height: 40, borderRadius: 8 },
          autoClose: 2000,
        });
      });
  };

  const missionGroup = removeDuplicateItemsByType(
    missionsData.data?.data.data ?? []
  ).filter((item) => item?.type !== missionsTypes.SIGN_IN);

  return (
    <>
      {missionsData.isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-auto pt-[42px] px-4 relative h-screen bg-[#F2FFE0] dark:bg-transparent">
          <ToastContainer
            position="top-left"
            closeOnClick
            transition={Slide}
            hideProgressBar
            limit={1}
            stacked
            className="top-3 max-w-[337px] left-[50%] -translate-x-[50%]"
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
              Complete the mission to get more seed
            </p>
          </div>

          {/* options */}

          {/* daily missions */}
          <div className={clsx(isDesktop ? "mt-2" : "mt-[49px]")}>
            <div
              onClick={() =>
                setIsOpenDailyMission({ isOpen: true, type: "", data: null })
              }
              className={clsx(
                "btn-hover dark:btn-click z-10 relative cursor-pointer grid grid-cols-10 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
                "dark:gradient-border-mask-mission dark:bg-transparent",
                "border-[3px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C]",
                "dark:boder-0 dark:drop-shadow-none "
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
              <div className="col-span-8 flex items-center dark:text-white">
                <div className="">
                  <p className="font-semibold text-base">Login Bonus</p>
                  {dailyMissions?.data &&
                    ((dailyMissions?.data.data.data?.length || 0) === 0 ||
                      (!checkSameDay(dailyMissions?.data.data.data ?? []) &&
                        dailyMissions?.data.data.data?.length < 7)) ? (
                    <div className="flex items-center text-sm">
                      <Progress className="mr-1" value={(0 / 1) * 100} />
                      <span>{`In progress (0/1)`}</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src="/images/daily/mission_complete.png"
                        className="dark:hidden inline-block w-4 mr-1"
                        alt=""
                      ></img>
                      <img
                        src="/images/daily/dark_mission_complete.png"
                        className="hidden dark:inline-block w-4 mr-1"
                        alt=""
                      ></img>
                      <span>{`Completed (1/1)`}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {missionGroup.map((item, index) => {
              const totalMission = getMissionsByType(
                item.type,
                missionsData.data?.data.data ?? []
              );
              const doneMission = getMissionsByType(
                item.type,
                missionsData.data?.data.data ?? []
              ).filter((mission: any) => mission.task_user?.completed === true).length;

              let name = "";

              if (index === 0) {
                name = "Follow our Ecosystem";
              } else {
                name = "Join our Community";
              }

              return (
                <div
                  onClick={() => handleChooseMission(item.type)}
                  key={index}
                  className={clsx(
                    "btn-hover dark:btn-click z-10 relative cursor-pointer grid grid-cols-10 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
                    "dark:gradient-border-mask-mission dark:bg-transparent",
                    "border-[3px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C]",
                    "dark:drop-shadow-none"
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
                  <div className="col-span-8 flex items-center dark:text-white">
                    <div className="">
                      <p className="font-semibold text-base">{name}</p>
                      {doneMission === totalMission.length ? (
                        <div className="flex items-center text-sm">
                          <img
                            src="/images/daily/mission_complete.png"
                            className="dark:hidden inline-block w-4 mr-1"
                            alt=""
                          ></img>
                          <img
                            src="/images/daily/dark_mission_complete.png"
                            className="hidden dark:inline-block w-4 mr-1"
                            alt=""
                          ></img>
                          <span>{`Completed (${doneMission}/${totalMission.length})`}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-sm">
                          <Progress
                            className="mr-1"
                            value={(doneMission / totalMission.length) * 100}
                          />
                          <span>{`In progress (${doneMission}/${totalMission.length})`}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {isOpen.isOpen && (
            <MissionsModal
              isLoading={doMission.isPending || getMissionStatus.isLoading}
              handleDoMission={(id: string) => handleDoMission(id)}
              data={missionsData.data?.data.data ?? []}
              type={isOpen.type}
              closeModal={() => setisOpen({ isOpen: false, type: "" })}
              isOpen={isOpen.isOpen}
            ></MissionsModal>
          )}

          {isOpenDailyMission.isOpen && dailyMissions?.data && (
            <DailyMissonModal
              isLoading={doDailyMission.isPending}
              handleDoMission={() => handleDoDailyMission()}
              data={dailyMissions?.data.data.data ?? []}
              type={isOpen.type}
              closeModal={() =>
                setIsOpenDailyMission({ isOpen: false, type: "", data: null })
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default MissionsPage;
