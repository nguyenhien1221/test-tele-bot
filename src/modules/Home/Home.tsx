/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import NavBar from "../../components/common/NavBar";
import { useEffect, useRef, useState } from "react";
import { formatNumberFloatFix } from "../../utils/formatNumber";

const Home = () => {
  const [isClaimed, setIsClaimed] = useState<any>(false);
  const [instorage, setInstorage] = useState<any>(() => {
    const savedCount = Number(localStorage.getItem("count") as string);
    console.log(localStorage.getItem("count"), savedCount);
    return isNaN(savedCount) ? 0 : savedCount;
  });
  const [isFull, setIsFull] = useState<boolean>(false);

  const endTime = 1712807990;
  const startTime = 1712804142;
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
      setInstorage((instorage: any) => {
        const newCount = instorage + tokenPerSec;
        localStorage.setItem("count", formatNumberFloatFix(newCount, 5));
        return newCount;
      });

      progressRef.current.style.width =
        (percentEnd >= 100 ? 100 : percentEnd) + "%";
      if (percentEnd >= 100) {
        clearInterval(countProgess);
        setIsFull(true);
      }
    }, 1000);

    return () => {
      clearInterval(countProgess);
    };
  }, [isClaimed]);

  const handleClaim = () => {
    clearInterval(countProgess);
    progressRef.current.style.width = 0;
    setIsClaimed(!isClaimed);
    setIsFull(false);
    setInstorage(() => {
      console.log(localStorage.getItem("count"), 0);
      return;
    });
  };

  return (
    <div className="h-screen px-4 relative bg-gradient-to-b from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2]">
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
                {formatNumberFloatFix(0.00011111, 5)}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-[20px] max-h-[312px] flex justify-center">
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
          <div className=" relative z-10 grid grid-cols-7 gap-1">
            <div className="col-span-2 ">
              <img
                src="/images/icons/storage1.svg"
                width={62}
                alt="storage"
              ></img>
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
            <div className="flex items-center col-span-2 ">
              <Button
                disabled={!isFull}
                onClick={handleClaim}
                className="w-full h-40px rounded-lg disabled:bg-black disabled:text-[#747474] bg-gradient-to-r from-[#F9D52A] to-[#F54979] text-[#fff] text-sm font-bold"
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
