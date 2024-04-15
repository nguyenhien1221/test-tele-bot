/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../../components/common/NavBar";
import { useEffect, useRef, useState } from "react";
import { formatDecimals, formatNumberFloatFix } from "../../utils/formatNumber";
import useGetAcountBalance from "./Hooks/useGetAcountBalance";
import useClaimSeed from "./Hooks/useClaimSeed";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const Home = () => {
  const tele = window.Telegram.WebApp;

  tele.BackButton.hide();

  const AcountBalnce = useGetAcountBalance();
  const ClaimSeed = useClaimSeed();

  const [isClaimed, setIsClaimed] = useState<any>(false);
  const [instorage, setInstorage] = useState<any>(() => {
    const savedCount = Number(localStorage.getItem("count") as string);
    return isNaN(savedCount) ? 0 : savedCount;
  });
  const [isFull, setIsFull] = useState<boolean>(false);

  const endTime = 1712893822;
  const startTime = 1712890222;
  const tokenPerSec = 0.00001;

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
          localStorage.setItem("count", formatNumberFloatFix(newCount, 5));
          return newCount;
        });
      }

      progressRef.current.style.width =
        (percentEnd >= 100 ? 100 : percentEnd) + "%";
      if (percentEnd >= 100) {
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
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          style: { width: 272, borderRadius: 8 },
        });
      });
  };

  return (
    <div className="h-[100vh] px-4 relative bg-gradient-to-b from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2]">
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
              {formatNumberFloatFix(instorage, 5)}
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
                  5
                )}
              </p>
            </div>
          </div>
        </div>
        <div className=" max-h-[312px] flex justify-center">
          <img
            className="object-contain"
            src="/images/trees/6.png"
            height={312}
            alt=""
          ></img>
        </div>
      </div>

      {/* storage button */}
      <div className="relative">
        <div className=" bg-white rounded-2xl p-4 w-full overflow-hidden">
          <div
            ref={progressRef}
            className="bg-[#E4FFCE]  h-full top-0 left-0 absolute z-0 rounded-2xl"
          ></div>
          <div className=" relative z-10 grid grid-cols-8 gap-1">
            <div className="col-span-2 flex items-center">
              <div>
                <img
                  src="/images/icons/storage1.svg"
                  width={62}
                  alt="storage"
                ></img>
              </div>
            </div>
            <div className="col-span-3">
              <p className="font-bold">Storage</p>
              <div className="flex gap-[7px]">
                <img src="/images/icons/clock.svg" width={14} alt="clock"></img>
                <p className="text-xs">3h 36m to fill</p>
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
                    tokenPerSec,
                    5
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

      <div className="fixed bottom-6 left-4 right-4 mt-3">
        <NavBar />
      </div>
    </div>
  );
};

export default Home;
