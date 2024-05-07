/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../../components/common/NavBar";
import { useEffect, useRef, useState } from "react";
import { formatDecimals, formatNumberFloatFix } from "../../utils/formatNumber";
import useGetAcountBalance from "./Hooks/useGetAcountBalance";
import useClaimSeed from "./Hooks/useClaimSeed";
import { toast } from "react-toastify";
import clsx from "clsx";
import {
  calculateMinedSeeds,
  getSpeedUpgradesLevel,
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

const Home = () => {
  const tele = window.Telegram.WebApp;
  // const isExpanded = tele.isExpanded;
  // const viewHeight = tele.viewportHeight;

  tele.BackButton.hide();

  const mode = localStorage.getItem("mode");
  const changeMode = useChangeMode((state: any) => state.updateMode);

  const AcountBalnce = useGetAcountBalance();
  const AcountData = useGetAcountDetails();
  const ClaimSeed = useClaimSeed();
  const MissionsData = useGetMissions();
  const doMission = useDoMissions();
  const LatestMessage = useGetLatestMessage();

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

  const isSmallScreen = window.innerHeight <= 520 ? true : false;
  const LatestMessageTime = LatestMessage.data?.data.data;
  const ReadMessageTime = localStorage.getItem("readMessageTime");

  const isReadNewMessage = LatestMessageTime?.date > Number(ReadMessageTime);

  const firstLoginMission =
    MissionsData.data &&
    MissionsData.data.data.data.find(
      (item: any) => item.name === "Hello, world"
    );

  let minedSeed = 0;

  if (firstLoginMission?.task_user?.completed) {
    minedSeed = formatDecimals(
      calculateMinedSeeds(
        AcountData.data?.data.data.last_claim,
        AcountData.data?.data.data.upgrades ?? [],
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

  const progressRef = useRef<any>();
  let countProgess: any;

  // useEffect(() => {
  //   window.Telegram.WebApp.onEvent("viewportChanged", () => {
  //     setExpand(isExpanded);
  //   });
  // }, [viewHeight]);

  useEffect(() => {
    if (firstLoginMission?.task_user === null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [MissionsData.data]);

  useEffect(() => {
    if (timePassed >= 120) {
      setIsFull(true);
    } else {
      setIsFull(false);
      setIsClaimed(false);
    }
  }, [timePassed]);

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
        progressRef.current.style.width = "0%";
        clearInterval(countProgess);
        setIsClaimed(true);
        setInstorage(() => {
          localStorage.setItem("count", "0");
          return 0;
        });

        AcountBalnce.refetch();
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
      .then(() => {
        MissionsData.refetch();
        AcountBalnce.refetch();
        AcountData.refetch();
        setIsOpen(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message, { autoClose: 2000 });
      });
  };

  const handleCheckNews = () => {
    localStorage.setItem(
      "readMessageTime",
      String(new Date().getTime() / 1000)
    );

    tele.openLink(process.env.REACT_APP_GROUP_URL);
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

  return (
    <>
      {AcountData.isLoading ? (
        <Loading />
      ) : (
        <div
          className={clsx(
            "h-screen overflow-hidden flex flex-col flex-1 px-4 pb-[140px] relative ",
            "dark:bg-transparent dark:bg-gradient-to-b from-transparent via-transparent to-transparent ",
            "bg-gradient-to-b from-[#F7FFEB] via-[#E4FFBE] to-[#79B22A]"
          )}
        >
          <div>
            <div className="flex flex-col items-center flex-1 ">
              <p
                className={
                  "dark:text-white text-base font-normal ,dark:text-white"
                }
              >
                In Storage:
              </p>
              <div className="flex items-center gap-2">
                <img
                  src="/images/icons/token_icon.png"
                  width={44}
                  height={44}
                  alt="token"
                ></img>
                <p className="dark:text-white text-[35px] font-black">
                  {minedSeed.toFixed(6)}
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
                      Number(formatDecimals(AcountBalnce.data?.data.data)) ?? 0,
                      6
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "flex flex-1 max-h-[560px] justify-center bg-no-repeat bg-contain bg-center z-30 ",
              isSmallScreen ? "mb-2 mt-2" : "mb-5 mt-4"
            )}
            style={{
              backgroundImage: "url('/images/trees/6.png')",
            }}
          >
            <button
              onClick={handleSwitchMode}
              className={clsx(
                " absolute right-8 rounded-[50%] w-[48px] h-[48px] flex justify-center items-center",
                "bg-[#7BB52C] border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B]"
              )}
            >
              <img
                className="w-[30px] h-[30px]"
                src={
                  theme === "light" ? "/images/light.svg" : "/images/dark.svg"
                }
                alt=""
              />
            </button>
          </div>

          {/* storage button */}
          <div className=" rounded-2xl  z-10">
            <div
              className={clsx(
                "max-h-[90px] min-h-[90px] ",
                isSmallScreen ? "mt-1" : ""
              )}
            >
              <div className="dark:gradient-border-mask-storage">
                <div
                  className={clsx(
                    "rounded-2xl w-full relative overflow-hidden ",
                    "dark:bg-transparent",
                    "bg-white",
                    isSmallScreen ? "p-2" : "p-4"
                  )}
                >
                  {/* progess bar */}
                  <div
                    ref={progressRef}
                    className={clsx(
                      "h-full top-0 left-0 absolute z-10",
                      "dark:bg-[#112C0D]",
                      "bg-[#E4FFCE]"
                    )}
                  ></div>

                  {/* blur when has news */}
                  {isReadNewMessage && (
                    <div className="bg-[#000] opacity-60  w-full h-full top-0 left-0 absolute z-30 flex justify-center items-center">
                      <Button
                        onClick={handleCheckNews}
                        className="capitalize font-extrabold text-white py-3 px-[14px] border-solid border-[1px] border-white rounded-2xl"
                      >
                        Check New
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
                        {/* <img
                      src={
                        isFill
                          ? "/images/icons/time_checked.svg"
                          : "/images/icons/clock.svg"
                      }
                      width={14}
                      alt="clock"
                    ></img> */}
                        <p className="text-sm font-medium ">
                          {isFill ? (
                            "Filled"
                          ) : (
                            <Countdown
                              date={endTime * 1000}
                              onComplete={() => clearInterval(countProgess)}
                            ></Countdown>
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          {/* <img
                        src="/images/icons/token_icon.png"
                        width={14}
                        height={14}
                        alt="token"
                      ></img> */}
                          <p className="text-xs font-normal ">{`${
                            boostSpeedLevel[
                              getSpeedUpgradesLevel(AcountData.data?.data.data)
                            ]?.speed
                          } SEED/hour`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end col-span-3 ">
                      <LoadingButton
                        variant="contained"
                        loading={ClaimSeed.isPending}
                        disabled={!isFull || isClaimed}
                        onClick={handleClaim}
                        className={clsx(
                          "w-[100px] h-40px capitalize rounded-lg text-sm font-bold",
                          "text-[#fff] bg-gradient-to-r from-[#97C35B] to-[#61A700]  border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B] ",
                          "hover:drop-shadow-none disabled:bg-[#B1B1B1] disabled:drop-shadow-[0_4px_1px_#797979] disabled:border-[#C4C4C4]",
                          isSmallScreen ? "py-2" : "py-3"
                        )}
                      >
                        Claim
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={clsx("fixed left-4 right-4 z-30", "bottom-[46px] ")}>
            <NavBar />
          </div>
        </div>
      )}

      {isOpen && (
        <GetFirstTokenModal
          isLoading={doMission.isPending}
          handleClaim={() => handleClaimMissionReward()}
          reward={formatDecimals(firstLoginMission?.reward_amount ?? 0)}
          closeModal={() => setIsOpen(false)}
        />
      )}

      <NotifiModal
        isOpen={isOpenNotifi}
        handleClose={() => setIsOpenNotifi(false)}
      />
    </>
  );
};

export default Home;
