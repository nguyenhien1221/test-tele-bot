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
import Countdown from "react-countdown";

const Home = () => {
  const tele = window.Telegram.WebApp;
  tele.BackButton.hide();

  const AcountBalnce = useGetAcountBalance();
  const AcountData = useGetAcountDetails();
  const ClaimSeed = useClaimSeed();

  const [isClaimed, setIsClaimed] = useState<any>(false);
  const [instorage, setInstorage] = useState<any>(() => {
    const savedCount = Number(localStorage.getItem("count") as string);
    return isNaN(savedCount) ? 0 : savedCount;
  });
  const [isFull, setIsFull] = useState<boolean>(false);

  const isDesktop = window.innerHeight < 610 ? true : false;
  const isSmallScreen = window.innerHeight < 380 ? true : false;

  const minedSeed = formatDecimals(
    calculateMinedSeeds(
      AcountData.data?.data.data.last_claim,
      AcountData.data?.data.data.upgrades ?? [],
      new Date().getTime()
    )
  );

  const startTime =
    new Date(AcountData.data?.data.data.last_claim).getTime() / 1000;
  const endTime =
    startTime +
    bootsStorageLevel[getSpeedUpgradesLevel(AcountData.data?.data.data) - 1]
      ?.duration *
      3600;
  console.log(startTime, endTime);
  const tokenPerSec =
    boostSpeedLevel[getSpeedUpgradesLevel(AcountData.data?.data.data) - 1]
      ?.speed / 3600;

  const progressRef = useRef<any>();
  let countProgess: any;

  useEffect(() => {
    countProgess = setInterval(() => {
      const now = new Date().getTime() / 1000;
      const distanceFromStart = now - startTime;
      const distanceFromEnd = endTime - startTime;
      const percentEnd = (distanceFromStart / distanceFromEnd) * 100;

      //save mained token to local storage
      if (percentEnd < 100) {
        setInstorage((instorage: any) => {
          const newCount = instorage + tokenPerSec;
          localStorage.setItem("count", formatNumberFloatFix(newCount, 6));
          return newCount;
        });
      }

      progressRef.current.style.width =
        (percentEnd >= 100 ? 100 : percentEnd) + "%";
      if (percentEnd >= 40) {
        clearInterval(countProgess);
        setIsFull(true);
      } else {
        setIsFull(false);
      }
    }, 1000);

    return () => {
      clearInterval(countProgess);
    };
  }, [isClaimed]);

  const handleClaim = () => {
    console.log("mined:", minedSeed, instorage);

    ClaimSeed.mutateAsync()
      .then(() => {
        clearInterval(countProgess);
        progressRef.current.style.width = 0;
        setIsClaimed(!isClaimed);
        setIsFull(false);
        setInstorage(() => {
          localStorage.setItem("count", "0");
          return;
        });

        AcountBalnce.refetch();
        AcountData.refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          style: { width: 272, borderRadius: 8 },
        });
      });
  };

  return (
    <div className="h-screen overflow-hidden px-4 relative bg-gradient-to-b from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2]">
      <div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-normal">In Storage:</p>
          <div className="flex items-center gap-2">
            <img
              src="/images/icons/token_icon.svg"
              width={44}
              height={44}
              alt="token"
            ></img>
            <p className="text-[40px] font-bold">
              {formatNumberFloatFix(instorage, 6)}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-sm font-normal">SEED Balance:</p>
            <div className="flex items-center gap-1">
              <img
                src="/images/icons/token_icon.svg"
                width={17}
                height={17}
                alt="token"
              ></img>
              <p className="text-sm font-bold">
                {formatNumberFloatFix(
                  Number(formatDecimals(AcountBalnce.data?.data.data)) ?? 0,
                  6
                )}
              </p>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            isDesktop ? "h-[275px]" : "h-[312px]",
            isSmallScreen ? "hidden" : "flex justify-center"
          )}
        >
          <img
            className="object-contain"
            src="/images/trees/6.png"
            height={312}
            alt=""
          ></img>
        </div>
      </div>

      {/* storage button */}
      <div className={clsx(isSmallScreen ? "mt-4 relative" : "relative")}>
        <div className=" bg-white rounded-2xl p-4 w-full overflow-hidden">
          <div
            ref={progressRef}
            className="bg-[#E4FFCE]  h-full top-0 left-0 absolute z-0 rounded-2xl"
          ></div>
          <div className=" relative z-10 grid grid-cols-8 gap-1">
            <div className="col-span-2 flex items-center">
              <div>
                <img src="/images/storage/1.png" width={62} alt="storage"></img>
              </div>
            </div>
            <div className="col-span-3">
              <p className="font-bold">Storage</p>
              <div className="flex gap-[7px]">
                <img src="/images/icons/clock.svg" width={14} alt="clock"></img>
                <p className="text-xs">
                  <Countdown
                    date={endTime / 1000}
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
                  <p className="text-xs font-normal">{`${formatNumberFloatFix(
                    boostSpeedLevel[
                      getSpeedUpgradesLevel(AcountData.data?.data.data) - 1
                    ]?.speed,
                    6
                  )} SEED/hour`}</p>
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
      <div className="fixed bottom-6 left-4 right-4">
        <NavBar />
      </div>
    </div>
  );
};

export default Home;
