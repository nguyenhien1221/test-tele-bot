/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { missionsTypes } from "../../../constants/missions.constants";
import MissionsModal from "../Components/MissionsModal";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import useGetMissions from "../Hooks/useGetMissions";
import useDoMissions from "../Hooks/useDoMissions";
import { Slide, ToastContainer, toast } from "react-toastify";
import Loading from "../../../components/common/Loading";
import DailyMissonModal from "../Components/DailyMissonModal";
import useGetDailyMissions from "../Hooks/useGetDaily";
import useDoDailyMissions from "../Hooks/useDoDaily";
import { renderErrMessage } from "../../../utils/helper";
import Progress from "../../../components/common/Progress";
import { api } from "../../../config/api";
import { navPaths } from "../../../constants/navbar.constants";

const MissionsPage = () => {
  console.debug('cache prune - 2');
  const location = useLocation();
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;
  const missionsData = useGetMissions();
  const doMission = useDoMissions();
  const dailyMissions = useGetDailyMissions();
  const doDailyMission = useDoDailyMissions();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const [isOpen, setisOpen] = useState<{
    isOpen: boolean;
    type: string;
    missions: any[];
  }>({ isOpen: false, type: "", missions: [] });
  const [isOpenDailyMission, setIsOpenDailyMission] = useState<any>({
    isOpen: location?.state?.isOpenDailyModal ?? false,
    type: "",
    data: null,
  });
  const [loading, setLoading] = useState(false);

  const isDesktop = window.innerHeight < 610;
  const isSmallPhone = window.innerHeight <= 736;

  const handleChooseMission = (subgroupType: string, missions: any[]) => {
    setisOpen({ isOpen: true, type: subgroupType, missions: missions });
  };

  const handleBackBtn = () => {
    navigate("/");
    setisOpen({ isOpen: false, type: "", missions: [] });
  };

  const handleDoMission = (item: any) => {
    if (item?.task_user === null || !item?.task_user?.completed) {
      // open telegram when mission telegram boost is not done yet
      if (item.type === missionsTypes.TELEGRAM_BOOST) {
        tele.openTelegramLink(item?.metadata?.url ?? "");
      }
      doMission
        .mutateAsync(item.id)
        .then(async (data) => {
          setLoading(true);
          for (let i = 0; i <= 10; i++) {
            let res = null;
            try {
              res = await api.get(
                `/api/v1/tasks/notification/${data?.data?.data}`
              );
            } catch (err) {
              console.debug(err);
            }

            if (res?.data?.data != null) {
              if (!!res?.data?.data?.data?.completed) {
                toast.success("Mission completed", {
                  style: { maxWidth: 337, height: 40, borderRadius: 8 },
                  autoClose: 2000,
                });
                setLoading(false);
                missionsData.refetch();
                return;
              }

              // redirect to refer page when refer-premium mission is not done yet
              if (
                res?.data?.data?.error === "incomplete task" &&
                item.type === missionsTypes.REFER_PREMIUM
              ) {
                navigate(navPaths.FRIENDS);
              }

              toast.error(renderErrMessage(res?.data?.data?.error), {
                style: { maxWidth: 337, height: 40, borderRadius: 8 },
                autoClose: 2000,
              });
              setLoading(false);
              return;
            }

            if (i === 10) {
              toast.error("Verify mission timed out", {
                style: { maxWidth: 337, height: 40, borderRadius: 8 },
                autoClose: 2000,
              });
              setLoading(false);
              return;
            }

            await new Promise((r) => setTimeout(r, 1000));
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
        });
      return;
    }
    if (item.type === missionsTypes.TELEGRAM_BOOST) {
      tele.openTelegramLink(item?.metadata?.url ?? "");
      return;
    }
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

  const missions = (missionsData.data?.data?.data ?? []).filter(
    (item: any) => item?.type !== missionsTypes.SIGN_IN
  );
  const missionGroups = (() => {
    const groups: {
      [key: string]: {
        name: string;
        order: number;
        subgroups: {
          [key: string]: {
            subgroup_img: string;
            type: string;
            name: string;
            order: number;
            missions: any[];
          };
        };
      };
    } = {};
    for (let i = 0; i < missions.length; i++) {
      const missionGroupName = missions[i]?.metadata?.group_name || "Others";
      const missionGroupOrder =
        Number(missions[i]?.metadata?.group_order) || 999_999_999;
      const missionSubgroupName =
        missions[i]?.metadata?.subgroup_name || "Common";
      const missionSubgroupType =
        missions[i]?.metadata?.subgroup_type || "common";
      const missionSubgroupOrder =
        Number(missions[i]?.metadata?.subgroup_order) || 999_999_999;
      const subgroupImgUrl =
        missions[i]?.metadata?.subgroup_img || "/images/timeout.png?v=3";
      const group = groups[missionGroupName] || {
        name: missionGroupName,
        order: missionGroupOrder,
        subgroups: {},
      };

      const subgroup = group.subgroups[missionSubgroupType] || {
        subgroup_img: subgroupImgUrl,
        type: missionSubgroupType,
        name: missionSubgroupName,
        order: missionSubgroupOrder,
        missions: [],
      };

      subgroup.missions.push(missions[i]);

      group.subgroups[missionSubgroupType] = subgroup;
      groups[missionGroupName] = group;
    }

    return Object.values(groups)
      .map((group) => ({
        ...group,
        subgroups: Object.values(group.subgroups).sort(
          (a, b) => a.order - b.order
        ),
      }))
      .sort((a, b) => a.order - b.order);
  })();

  const modalMissions = missions.filter(
    (item: any) => item.metadata.subgroup_name === isOpen.type
  );

  const sortedGroups = missionGroups.sort((a, b) => {
    const isACompleted = a.subgroups.every((subgroup) =>
      subgroup.missions.every(
        (mission) =>
          mission?.task_user !== null || mission?.task_user?.completed === true
      )
    );
    const isBCompleted = b.subgroups.every((subgroup) =>
      subgroup.missions.every(
        (mission) =>
          mission?.task_user !== null || mission?.task_user?.completed === true
      )
    );

    if (!isACompleted && isBCompleted) {
      return -1;
    }
    if (isACompleted && !isBCompleted) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      {missionsData.isLoading ? (
        <Loading />
      ) : (
        <div className=" pt-[42px] px-4 relative h-screen bg-[#F2FFE0] dark:bg-transparent">
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
            <p className="text-[24px] font-extrabold">Missions</p>
          </div>

          {/* daily missions */}
          <div
            className={clsx(
              isDesktop ? "mt-2" : "mt-3",
              "overflow-auto max-h-[calc(100%-100px)] "
            )}
          >
            {/* <div
              className={clsx(
                "dark:bg-[#E3FCC214]",
                " mb-6 border-[1px] border-[#4D7F0C] rounded-2xl bg-[#E3FCC2]",
                isSmallPhone ? "p-2" : "p-4"
              )}
            >
              <div className="pb-[10px] font-semibold dark:text-white">
                Daily
              </div>
              <div
                onClick={() =>
                  setIsOpenDailyMission({ isOpen: true, type: "", data: null })
                }
                className={clsx(
                  "btn-hover dark:btn-click z-10 relative cursor-pointer grid grid-cols-10 gap-3 bg-white rounded-2xl p-4 w-full ",
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
                    (dailyMissions?.data.data.data?.length === 0 ||
                      !checkSameDay(dailyMissions?.data?.data?.data ?? [])) ? (
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
            </div> */}
            {sortedGroups.map((group, index) => {
              return (
                <div
                  key={`mission-group-${index}`}
                  className={clsx(
                    "dark:bg-[#E3FCC214]",
                    index !== missionGroups.length ? "mb-6" : "",
                    "relative z-20 border-[1px] border-[#4D7F0C] rounded-2xl bg-[#E3FCC2] ",
                    isSmallPhone ? "px-2 pt-2" : "px-4 pt-4"
                  )}
                >
                  <div className="pb-[10px] font-semibold dark:text-white">
                    {group.name}
                  </div>
                  {group.subgroups
                    .sort((a, b) => {
                      const isACompleted = a.missions.every(
                        (mission) =>
                          mission?.task_user !== null ||
                          mission?.task_user?.completed === true
                      );

                      const isBCompelted = b.missions.every(
                        (mission) =>
                          mission?.task_user !== null ||
                          mission?.task_user?.completed === true
                      );
                      if (!isACompleted && isBCompelted) {
                        return -1;
                      }
                      if (isACompleted && !isBCompelted) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((subgroup, index) => {
                      const totalMission = subgroup.missions.length;
                      const doneMission = subgroup.missions.filter(
                        (mission: any) => mission.task_user?.completed === true
                      )?.length;

                      return (
                        <div
                          onClick={() => {
                            handleChooseMission(
                              subgroup.name,
                              subgroup.missions
                            );
                          }}
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
                                src={subgroup.subgroup_img}
                                width={48}
                                height={48}
                                alt="storage"
                              ></img>
                            </div>
                          </div>
                          <div className="col-span-8 flex items-center dark:text-white">
                            <div className="">
                              <p className="font-semibold text-base">
                                {subgroup.name}
                              </p>
                              {doneMission === totalMission ? (
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
                                  <span>{`Completed (${doneMission}/${totalMission})`}</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-sm">
                                  <Progress
                                    className="mr-1"
                                    value={(doneMission / totalMission) * 100}
                                  />
                                  <span>{`In progress (${doneMission}/${totalMission})`}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
          {isOpen.isOpen && (
            <MissionsModal
              isLoading={doMission.isPending || loading}
              handleDoMission={(item: string) => handleDoMission(item)}
              missions={modalMissions}
              type={isOpen.type}
              closeModal={() =>
                setisOpen({ isOpen: false, type: "", missions: [] })
              }
              isOpen={isOpen.isOpen}
              reFetch={() => {
                missionsData.refetch();
              }}
            ></MissionsModal>
          )}

          {isOpenDailyMission.isOpen && dailyMissions?.data && (
            <DailyMissonModal
              isLoading={doDailyMission.isPending}
              handleDoMission={() => handleDoDailyMission()}
              data={dailyMissions?.data.data.data ?? []}
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
