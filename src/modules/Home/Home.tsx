/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../../components/common/NavBar";
import { useEffect, useRef, useState } from "react";
import {
  formatDecimals,
  formatNumberFloatFix,
  getNumberFormatUs,
} from "../../utils/formatNumber";
import useGetAcountBalance from "./Hooks/useGetAcountBalance";
import useClaimSeed from "./Hooks/useClaimSeed";
import { toast } from "react-toastify";
import clsx from "clsx";
import {
  boardingEventEnd,
  boardingEventEnd2,
  boardingEventStart,
  boardingEventStart2,
  calculateMinedSeeds2,
  calculateMiningSpeed,
  getMiningSpeedByLevel,
  getSpeedUpgradesLevel,
  getStorageSizeByLevel,
  getStorageUpgradesLevel,
} from "../../utils/minedSeed";
import useGetAcountDetails from "../../components/Hooks/useRegister";
import {
  boostSpeedLevel,
  bootsStorageLevel,
} from "../../constants/boots.constants";
import Countdown from "../../components/common/Countdown";
import Loading from "../../components/common/Loading";
import useGetMissions from "../Missions/Hooks/useGetMissions";
import GetFirstTokenModal from "./Components/getFirstTokenModal";
import useDoMissions from "../Missions/Hooks/useDoMissions";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import useGetLatestMessage from "./Hooks/useGetLatestMessage";
import NotifiModal from "../../components/common/NotifiModal";
import { useChangeMode } from "../../store/modeStore";
import RecieveGiftModal from "./Components/RecieveGiftModal";
import WinPriceModal from "./Components/WinPriceModal";
import useGetHappyDay from "./Hooks/useGetHappyDay";
import useClaimHappyDay from "./Hooks/useClaimHappyDay";
import useGetHappyDayHistory from "./Hooks/useGetHistoyHappyday";
import { checkSameDay } from "../../utils/helper";
import { missionsTypes } from "../../constants/missions.constants";
import useGetDailyMissions from "../Missions/Hooks/useGetDaily";
import { api } from "../../config/api";
import DailyMissonModal from "../Missions/Components/DailyMissonModal";
import useDoDailyMissions from "../Missions/Hooks/useDoDaily";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const tele = window.Telegram.WebApp;

  tele.BackButton.hide();

  const mode = localStorage.getItem("mode");
  // const isMemeContest = localStorage.getItem("memeCliked");
  const isCloseGuide = sessionStorage.getItem("isClickGuide");
  const changeMode = useChangeMode((state: any) => state.updateMode);

  const AcountBalance = useGetAcountBalance();
  const AcountData = useGetAcountDetails();
  const ClaimSeed = useClaimSeed();
  const MissionsData = useGetMissions();
  const doMission = useDoMissions();
  const LatestMessage = useGetLatestMessage();
  const HappyDay = useGetHappyDay();
  const ClaimHappyDay = useClaimHappyDay();
  const HappyDayHistory = useGetHappyDayHistory();
  const dailyMissions = useGetDailyMissions();
  const doDailyMission = useDoDailyMissions();

  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [instorage, setInstorage] = useState<any>(() => {
    const savedCount = Number(localStorage.getItem("count") as string);
    return isNaN(savedCount) ? 0 : savedCount;
  });
  const [isFull, setIsFull] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isFill, setIsFill] = useState<boolean>(false);
  // const [expand, setExpand] = useState<any>(isExpanded);
  const [theme, setTheme] = useState<string>(
    mode === "dark" ? "dark" : "light"
  );
  const [isOpenNotifi, setIsOpenNotifi] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(
    isCloseGuide === "true"
  );
  const [isWinHappyDay, setIsWinHappyDay] = useState<{
    isOpen: boolean;
    data: any;
  }>({
    isOpen: false,
    data: null,
  });
  const [count, setCount] = useState<number>(0);
  const [hasMissions, setHasMissions] = useState<boolean>(false);
  const [isFirstLoginLoading, setIsFirstLoginLoading] = useState(false);
  const [isOpenDailyMission, setIsOpenDailyMission] = useState<boolean>(
    location?.state?.isOpenDailyModal ?? false
  );

  const isSmallScreen = window.innerHeight <= 520;
  const LatestMessageTime = LatestMessage.data?.data.data;
  const ReadMessageTime = localStorage.getItem("readMessageTime");
  const date = new Date().toISOString();

  const isReadNewMessage = LatestMessageTime?.date > Number(ReadMessageTime);

  const firstLoginMission =
    MissionsData.data &&
    MissionsData.data.data.data.find((item: any) => item.type === "sign-in");

  let minedSeed = 0;

  if (firstLoginMission?.task_user?.completed) {
    minedSeed = formatDecimals(
      calculateMinedSeeds2(
        AcountData.data?.data?.data?.last_claim,
        getMiningSpeedByLevel(0),
        getStorageSizeByLevel(0),
        AcountData.data?.data?.data?.upgrades ?? [],
        HappyDayHistory.data?.data?.data ?? [],
        new Date().getTime()
      )
    );
  }

  const currentTime = new Date().getTime() / 1000;
  const startTime =
    new Date(AcountData.data?.data?.data?.last_claim).getTime() / 1000;
  const endTime =
    startTime +
    bootsStorageLevel[getStorageUpgradesLevel(AcountData.data?.data.data)]
      ?.duration *
      3600;

  const timePassed = currentTime - startTime;

  const tokenPerSec =
    boostSpeedLevel[getSpeedUpgradesLevel(AcountData.data?.data.data)]?.speed /
    10000;

  const treeRef = useRef<any>();
  const progressRef = useRef<any>();
  let countProgess: any;

  const isX2 =
    boardingEventStart < new Date().getTime() &&
    new Date().getTime() < boardingEventEnd;

  const isX4 =
    boardingEventStart2 < new Date().getTime() &&
    new Date().getTime() < boardingEventEnd2;

  const isClaimedHappyDay =
    HappyDayHistory.data && checkSameDay(HappyDayHistory.data.data.data);

  const miningSpeed =
    HappyDayHistory.data &&
    calculateMiningSpeed(
      getMiningSpeedByLevel(0),
      AcountData.data?.data?.data?.upgrades ?? [],
      HappyDayHistory.data?.data?.data,
      new Date().getTime()
    );

  useEffect(() => {
    if (dailyMissions.data && MissionsData.data) {
      const hasGardenMission = MissionsData.data?.data?.data
        .filter((item: any) => item?.type !== missionsTypes.SIGN_IN)
        .some((item: any) => item.task_user === null || !item.task_user.completed);

      const hasDailyMission =
        (dailyMissions?.data.data.data?.length || 0) === 0 ||
        (!checkSameDay(dailyMissions?.data.data.data ?? []) &&
          dailyMissions?.data.data.data?.length < 7);

      if (hasDailyMission || hasGardenMission) {
        setHasMissions(true);
        return;
      }
      setHasMissions(false);
    }
  }, [dailyMissions.data, MissionsData.data]);

  useEffect(() => {
    if (
      firstLoginMission != null &&
      (firstLoginMission?.task_user == null ||
        !firstLoginMission?.task_user?.completed)
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [MissionsData.data, firstLoginMission]);

  useEffect(() => {
    if (timePassed >= 1800) {
      setIsFull(true);
    } else {
      setIsFull(false);
      setIsClaimed(false);
    }
  }, [timePassed]);

  // caculate progessbar
  useEffect(() => {
    if (progressRef.current) {
      countProgess = setInterval(() => {
        const now = new Date().getTime() / 1000;
        const distanceFromStart = now - startTime;
        const distanceFromEnd = endTime - startTime;
        const percentEnd = (distanceFromStart / distanceFromEnd) * 100;

        if (percentEnd < 100) {
          setInstorage((instorage: any) => {
            const newCount = instorage + tokenPerSec;
            localStorage.setItem(
              "count",
              formatNumberFloatFix(minedSeed ?? 0, 6)
            );
            return newCount;
          });
          setIsFill(false);
        }
        if (percentEnd >= 100) {
          setIsFill(true);
        }

        progressRef.current.style.width =
          (percentEnd >= 100 ? 100 : percentEnd) + "%";
      }, 100);
    }
    return () => {
      clearInterval(countProgess);
    };
  }, [
    isClaimed,
    startTime,
    AcountData.data?.data.data,
    progressRef.current,
    AcountData.isLoading,
  ]);

  const handleClaim = () => {
    ClaimSeed.mutateAsync()
      .then(() => {
        clearInterval(countProgess);
        setIsClaimed(true);
        setInstorage(() => {
          localStorage.setItem("count", "0");
          return 0;
        });
        AcountBalance.refetch();
        AcountData.refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 2000 });
        AcountData.refetch();
      });
  };

  const handleClaimMissionReward = () => {
    doMission
      .mutateAsync(firstLoginMission.id)
      .then(async (data) => {
        setIsFirstLoginLoading(true);
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
              setIsFirstLoginLoading(false);
              MissionsData.refetch();
              AcountBalance.refetch();
              AcountData.refetch();
              setIsOpenNotifi(true);
              setIsOpen(false);
              return;
            }

            toast.error("Something went wrong", {
              style: { maxWidth: 337, height: 40, borderRadius: 8 },
              autoClose: 2000,
            });
            setIsFirstLoginLoading(false);
            return;
          }

          if (i === 10) {
            toast.error("Something went wrong", {
              style: { maxWidth: 337, height: 40, borderRadius: 8 },
              autoClose: 2000,
            });
            setIsFirstLoginLoading(false);
            return;
          }

          await new Promise((r) => setTimeout(r, 1000));
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", { autoClose: 2000 });
      });
  };

  const handleCheckNews = () => {
    localStorage.setItem(
      "readMessageTime",
      String(new Date(date).getTime() / 1000)
    );

    tele.openTelegramLink(process.env.REACT_APP_GROUP_URL);
    LatestMessage.refetch();
  };

  const handleSwitchMode = () => {
    setTheme(mode === "light" ? "dark" : "light");
    localStorage.setItem("mode", mode === "light" ? "dark" : "light");
    changeMode(mode === "light" ? "dark" : "light");
    if (mode === "light") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const getHappyDay = () => {
    const happyDays = HappyDay.data?.data?.data?.happy_days;
    if (!!happyDays) {
      return Object.keys(happyDays).includes(String(new Date().getUTCDay()));
    }
    return false;
  };

  const handleTapTree = () => {
    if (count < 10) {
      setCount(count + 1);
      treeRef.current.style.transform = "scale(0.95)";
      setTimeout(() => {
        treeRef.current.style.transform = "scale(1)";
      }, 100);
      return;
    }
    if (count === 10) {
      ClaimHappyDay.mutateAsync()
        .then((data) => {
          setIsWinHappyDay({ isOpen: true, data: data });
          AcountBalance.refetch();
          AcountData.refetch();
          MissionsData.refetch();
          HappyDayHistory.refetch();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message, {
            style: { borderRadius: 8 },
          });
        })
        .finally(() => {
          setCount(0);
        });
    }
  };

  const handleClaimHappyDay = () => {
    setIsWinHappyDay({ isOpen: false, data: null });
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

  // const handleTapMemeContest = () => {
  //   tele.showPopup(
  //     {
  //       message: `Do you want to open twitter `,
  //       buttons: [
  //         { id: "link", type: "default", text: "Open" },
  //         { type: "cancel" },
  //       ],
  //     },
  //     function (btn: any) {
  //       if (btn === "link") {
  //         tele.openLink(
  //           "https://x.com/SeedCombinator/status/1793230054803353994"
  //         );
  //         localStorage.setItem("memeCliked", "true");
  //       } else {
  //       }
  //     }
  //   );
  // };

  return (
    <>
      {AcountData.isLoading ? (
        <Loading />
      ) : (
        <div
          className={clsx(
            "h-screen overflow-hidden flex flex-col  flex-1 px-4 pb-[130px] relative ",
            "dark:bg-transparent dark:bg-gradient-to-b from-transparent via-transparent to-transparent ",
            "bg-gradient-to-b from-[#F7FFEB] via-[#E4FFBE] to-[#79B22A]"
          )}
        >
          <div>
            <div className="flex flex-col items-center flex-1 pt-3 relative">
              {/* <p
                className={
                  "dark:text-white text-base font-normal ,dark:text-white"
                }
              >
                In Storage:
              </p> */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-[50px]">
                  <img
                    src="/images/icons/token_icon.png"
                    width={44}
                    height={44}
                    alt="token"
                  ></img>
                </div>
                <p className="dark:text-white text-[35px] w-[182px] font-black">
                  {minedSeed < 0 ? Number(0).toFixed(6) : minedSeed.toFixed(6)}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="dark:text-white text-base font-normal">
                  SEED Balance:
                </p>
                <div className="flex items-center gap-1">
                  <img
                    src="/images/icons/token_icon.png"
                    width={17}
                    height={17}
                    alt="token"
                  ></img>
                  <p className="dark:text-white text-base font-black">
                    {formatNumberFloatFix(
                      Number(formatDecimals(AcountBalance.data?.data.data)) ??
                        0,
                      6
                    )}
                  </p>
                </div>
              </div>

              {/* light-dark mode btn */}
              <button
                onClick={handleSwitchMode}
                className={clsx(
                  "btn-hover z-20  rounded-lg w-[44px] h-[44px] flex justify-center items-center",
                  "absolute left-0 top-4",
                  "bg-[#FFFFFF] border-[1px] border-[#A1C96D]  drop-shadow-[0_2px_0px_#4C7E0B]",
                  "dark:radial-bg dark:border-[1px] dark:border-[#B0D381]"
                )}
              >
                <img
                  className="w-[30px] h-[30px]"
                  src={
                    theme === "light" ? "/images/light.png" : "/images/dark.png"
                  }
                  alt=""
                />
              </button>

              {/* game btn  */}
              <button
                className={clsx(
                  "btn-hover z-20  rounded-lg w-[44px] h-[44px] flex justify-center items-center",
                  "absolute right-0 top-4",
                  "bg-[#FFFFFF] border-[2px] border-[#A1C96D]  drop-shadow-[0_2px_0px_#4C7E0B]",
                  "dark:radial-bg dark:border-[1px] dark:border-[#B0D381]"
                )}
              >
                <img
                  className="w-[30px] h-[30px]"
                  src={"/images/game.png"}
                  alt=""
                />
              </button>
            </div>
            <div className="flex justify-center relative">
              {isX4 ? (
                <img
                  src="/images/x4.png"
                  className="w-[143px] h-[38px]"
                  alt=""
                ></img>
              ) : isX2 ? (
                <img
                  src="/images/x2.png"
                  className="w-[143px] h-[38px]"
                  alt=""
                ></img>
              ) : null}

              {/* daily mission btn  */}
              <button
                onClick={() => {
                  setIsOpenDailyMission(true);
                }}
                className={clsx(
                  "btn-hover z-20  rounded-lg w-[44px] h-[44px] flex justify-center items-center",
                  "absolute right-0 bottom-2",
                  "bg-[#FFFFFF] border-[2px] border-[#A1C96D]  drop-shadow-[0_2px_0px_#4C7E0B]",
                  "dark:radial-bg dark:border-[1px] dark:border-[#B0D381]"
                )}
              >
                <img
                  className="w-[30px] h-[30px]"
                  src={"/images/daily_icon.png"}
                  alt=""
                />
              </button>
            </div>
          </div>

          <div
            onClick={() => {
              getHappyDay() && !isClaimedHappyDay && handleTapTree();
            }}
            ref={treeRef}
            className={clsx(
              "flex flex-1 max-h-[550px] relative justify-center bg-no-repeat bg-contain bg-center z-30 ",
              // isSmallScreen ? "mb-2 mt-2" : "mb-5 mt-4 ",
              getHappyDay() && !isClaimedHappyDay ? "mt-0 mb-0" : "mt-0 mb-0"
            )}
            style={{
              backgroundImage: `url('/images/trees/${
                getHappyDay() && !isClaimedHappyDay ? 7 : 8
              }.png')`,
            }}
          >
            {/* {!isMemeContest && (
              <div className="absolute top-[64%] -translate-y-[50%] left-[115px] ">
                <img
                  onClick={() => handleTapMemeContest()}
                  className={clsx(
                    "dance-human",
                    isSmallScreen ? "w-[48px] h-[60px]" : "w-[78px] h-[90px]"
                  )}
                  src="/images/trees/human.png"
                  alt=""
                ></img>
              </div>
            )} */}
          </div>

          {/* storage button */}
          <div className=" dark:rounded-2xl z-10">
            <div className={clsx("max-h-[90px] ", isSmallScreen ? "mt-1" : "")}>
              <div className="dark:gradient-border-mask-storage dark:rounded-2xl">
                <div
                  className={clsx(
                    "rounded-2xl w-full relative overflow-hidden ",
                    "dark:bg-transparent",
                    "bg-white",
                    isSmallScreen ? "p-2" : "p-3"
                  )}
                >
                  {/* progess bar */}
                  <div
                    ref={progressRef}
                    className={clsx(
                      "h-full top-0 left-0 absolute z-10",
                      "dark:bg-[#152613]",
                      "bg-[#E4FFCE]"
                    )}
                  ></div>

                  {/* blur when has news */}
                  {isReadNewMessage && (
                    <div className="bg-[#000] opacity-60  w-full h-full top-0 left-0 absolute z-30 flex justify-center items-center">
                      <Button
                        onClick={handleCheckNews}
                        className=" font-extrabold text-white py-3 px-[14px] border-solid border-[1px] border-white rounded-2xl"
                      >
                        CHECK NEWS
                      </Button>
                    </div>
                  )}

                  <div
                    className={clsx(
                      "relative z-10 grid grid-cols-8 gap-1",
                      isReadNewMessage ? "blur-sm" : ""
                    )}
                  >
                    <div className="col-span-2 flex items-center">
                      <div>
                        <img
                          src={`/images/storage/${
                            getStorageUpgradesLevel(
                              AcountData.data?.data.data
                            ) + 1
                          }.png`}
                          width={isSmallScreen ? 52 : 62}
                          alt="storage"
                        ></img>
                      </div>
                    </div>
                    <div className="col-span-3 dark:text-white">
                      <p
                        className={
                          isSmallScreen
                            ? "font-extrabold  text-sm"
                            : "font-extrabold"
                        }
                      >
                        Storage
                      </p>
                      <div className="flex gap-[7px]">
                        <div className="text-sm font-medium ">
                          {isFill ? (
                            "Filled"
                          ) : (
                            <Countdown
                              date={endTime * 1000}
                              onComplete={() => clearInterval(countProgess)}
                            ></Countdown>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-normal ">{`${getNumberFormatUs(
                            formatDecimals(miningSpeed ?? 0),
                            3
                          )} SEED/hour`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end col-span-3 ">
                      <span
                        onClick={() => {
                          const timeRemain = Math.floor(
                            (1800 - timePassed) / 60
                          );

                          if (!toast.isActive("cant_claim")) {
                            if (!isFull || isClaimed) {
                              toast.error(
                                `Claim after ${
                                  timeRemain <= 1
                                    ? `1 minute`
                                    : `${timeRemain} minutes`
                                }`,
                                {
                                  toastId: "cant_claim",
                                  autoClose: 2000,
                                  style: { borderRadius: 8 },
                                }
                              );
                            }
                          }
                        }}
                      >
                        <LoadingButton
                          variant="contained"
                          loading={ClaimSeed.isPending}
                          disabled={!isFull || isClaimed}
                          onClick={handleClaim}
                          className={clsx(
                            "w-[100px] h-40px capitalize rounded-lg text-base font-bold",
                            "text-[#fff] bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B] ",
                            "btn-hover disabled:bg-[#B1B1B1] disabled:drop-shadow-[0_4px_0px_#797979] disabled:border-[#C4C4C4]",
                            isSmallScreen ? "py-2" : "py-3"
                          )}
                        >
                          Claim
                        </LoadingButton>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={clsx("fixed left-4 right-4 z-30", "bottom-[40px] ")}>
            <NavBar hasMission={hasMissions} />
          </div>
        </div>
      )}

      {isOpen &&
        firstLoginMission != null &&
        (firstLoginMission.task_user == null ||
          !firstLoginMission.task_user.completed) && (
          <GetFirstTokenModal
            isLoading={doMission.isPending || isFirstLoginLoading}
            handleClaim={() => handleClaimMissionReward()}
            reward={formatDecimals(firstLoginMission?.reward_amount ?? 0)}
            closeModal={() => setIsOpen(false)}
          />
        )}

      <NotifiModal
        isOpen={isOpenNotifi}
        handleClose={() => setIsOpenNotifi(false)}
      />

      {!isGuideModalOpen && getHappyDay() && !isClaimedHappyDay && (
        <RecieveGiftModal
          handleClose={() => {
            setIsGuideModalOpen(true);
            sessionStorage.setItem("isClickGuide", "true");
          }}
        />
      )}

      {isWinHappyDay.isOpen && isWinHappyDay.data && (
        <WinPriceModal
          data={isWinHappyDay.data}
          handleClose={() => handleClaimHappyDay()}
        />
      )}

      {isOpenDailyMission && dailyMissions?.data && (
        <DailyMissonModal
          isLoading={doDailyMission.isPending}
          handleDoMission={() => handleDoDailyMission()}
          data={dailyMissions?.data.data.data ?? []}
          closeModal={() => setIsOpenDailyMission(false)}
        />
      )}
    </>
  );
};

export default Home;
