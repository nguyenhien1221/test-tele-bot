/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../../components/common/NavBar";
import { useEffect, useRef, useState } from "react";
import { formatDecimals, formatNumberFloatFix } from "../../utils/formatNumber";
import useGetAcountBalance from "./Hooks/useGetAcountBalance";
import useClaimSeed from "./Hooks/useClaimSeed";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import clsx from "clsx";
import {
  calculateMinedSeeds,
  getSpeedUpgradesLevel,
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

const Home = () => {
  const tele = window.Telegram.WebApp;
  // const isExpanded = tele.isExpanded;
  // const viewHeight = tele.viewportHeight;

  tele.BackButton.hide();

  const AcountBalnce = useGetAcountBalance();
  const AcountData = useGetAcountDetails();
  const ClaimSeed = useClaimSeed();
  const MissionsData = useGetMissions();
  const doMission = useDoMissions();

  const [isClaimed, setIsClaimed] = useState<any>(false);
  const [instorage, setInstorage] = useState<any>(() => {
    const savedCount = Number(localStorage.getItem("count") as string);
    return isNaN(savedCount) ? 0 : savedCount;
  });
  const [isFull, setIsFull] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true)
  // const [expand, setExpand] = useState<any>(isExpanded);

  const isSmallScreen = window.innerHeight < 450 ? true : false;

  const minedSeed = formatDecimals(
    calculateMinedSeeds(
      AcountData.data?.data.data.last_claim,
      AcountData.data?.data.data.upgrades ?? [],
      new Date().getTime()
    )
  );

  
  console.log(minedSeed)


  const firstLoginMission = MissionsData.data && MissionsData.data.data.data.find((item: any) => item.name === "Hello, world")
  

  const currentTime = new Date().getTime() / 1000;
  const startTime =
    new Date(AcountData.data?.data.data.last_claim).getTime() / 1000;
  const endTime =
    startTime +
    bootsStorageLevel[getSpeedUpgradesLevel(AcountData.data?.data.data) - 1]
      ?.duration *
    3600;
  const timePassed = currentTime - startTime;

  const tokenPerSec =
    boostSpeedLevel[getSpeedUpgradesLevel(AcountData.data?.data.data) - 1]
      ?.speed / 10000;

  const timeToAdd = 360 / getSpeedUpgradesLevel(AcountData.data?.data.data);

  const progressRef = useRef<any>();
  let countProgess: any;

  // useEffect(() => {
  //   window.Telegram.WebApp.onEvent("viewportChanged", () => {
  //     setExpand(isExpanded);
  //   });
  // }, [viewHeight]);

  useEffect(() => {
    if (timePassed >= 120) {
      setIsFull(true);
    } else {
      setIsFull(false);
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
              formatNumberFloatFix(newCount ?? 0, 6)
            );
            return newCount;
          });
        }

        progressRef.current.style.width =
          (percentEnd >= 100 ? 100 : percentEnd) + "%";
      }, timeToAdd);
      return () => {
        clearInterval(countProgess);
      };
    }
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
        setIsClaimed(!isClaimed);
        setInstorage(() => {
          localStorage.setItem("count", "0");
          return 0;
        });

        AcountBalnce.refetch();
        AcountData.refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 2000 });
      });
  };

  const handleClaimMissionReward = () => {
    doMission.mutateAsync(firstLoginMission.id).then(() => {
      AcountData.refetch()
    }).catch(() => {
      toast.error("Fail to claim reward", { autoClose: 2000 })
    })
  }

  return (
    <>
      {AcountData.isLoading ? (
        <Loading />
      ) : (
        <div className="h-screen overflow-hidden flex flex-col flex-1 px-4 pb-[115px] relative bg-gradient-to-b from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2]">
          <div>
            <div className="flex flex-col items-center flex-1 pt-[38px]">
              <p className="text-base font-normal">In Storage:</p>
              <div className="flex items-center gap-2">
                <img
                  src="/images/icons/token_icon.svg"
                  width={44}
                  height={44}
                  alt="token"
                ></img>
                <p className="text-[35px] font-black">
                  {instorage?.toFixed(6)}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-base font-normal">SEED Balance:</p>
                <div className="flex items-center gap-1">
                  <img
                    src="/images/icons/token_icon.svg"
                    width={17}
                    height={17}
                    alt="token"
                  ></img>
                  <p className="text-base font-black">
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
              "flex flex-1 justify-center bg-no-repeat bg-contain bg-center"
            )}
            style={{ backgroundImage: "url('/images/trees/6.png')" }}
          ></div>

          {/* storage button */}
          <div
            className={clsx(
              isSmallScreen ? "mt-4 " : "",
              "max-h-[90px] min-h-[90px]"
            )}
          >
            <div className=" bg-white rounded-2xl p-4 w-full relative overflow-hidden">
              <div
                ref={progressRef}
                className="bg-[#E4FFCE]  h-full top-0 left-0 absolute z-0 "
              ></div>
              <div className=" relative z-10 grid grid-cols-8 gap-1">
                <div className="col-span-2 flex items-center">
                  <div>
                    <img
                      src="/images/storage/1.png"
                      width={62}
                      alt="storage"
                    ></img>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="font-extrabold">Storage</p>
                  <div className="flex gap-[7px]">
                    <img
                      src="/images/icons/clock.svg"
                      width={14}
                      alt="clock"
                    ></img>
                    <p className="text-xs">
                      <Countdown
                        date={endTime * 1000}
                        onComplete={() => clearInterval(countProgess)}
                      ></Countdown>
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/images/icons/token_icon.svg"
                        width={14}
                        height={14}
                        alt="token"
                      ></img>
                      <p className="text-xs font-normal">{`${boostSpeedLevel[
                        getSpeedUpgradesLevel(AcountData.data?.data.data) - 1
                      ]?.speed
                        } SEED/hour`}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end col-span-3 ">
                  <Button
                    disabled={!isFull}
                    onClick={handleClaim}
                    className="w-[100px] h-40px py-3 rounded-lg bg-gradient-to-r from-[#F9D52A] to-[#F54979] text-[#fff] text-sm font-bold"
                  >
                    Claim
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className={clsx("fixed left-4 right-4", "bottom-6")}>
            <NavBar />
          </div>
        </div>
      )}

      {(firstLoginMission?.task_user === null && isOpen) && <GetFirstTokenModal
        handleClaim={() => handleClaimMissionReward()}
        reward={formatDecimals(firstLoginMission.reward_amount ?? 0)}
        closeModal={() => setIsOpen(false)}
      />}
    </>
  );
};

export default Home;
