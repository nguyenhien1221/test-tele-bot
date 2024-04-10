/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import NavBar from "../../components/common/NavBar";
import { useEffect, useRef, useState } from "react";

const tele = window.Telegram.WebApp;
console.log(tele);

const Home = () => {
  const [isClaimed, setisClaimed] = useState<any>(false);
  const endTime = 1712745314;
  const startTime = 1712743814;

  const progressRef = useRef<any>();
  let countProgess: any;

  useEffect(() => {
    countProgess = setInterval(() => {
      const now = new Date().getTime() / 1000;
      const distanceFromStart = now - startTime;
      const distanceFromEnd = endTime - startTime;
      const percentEnd = (distanceFromStart / distanceFromEnd) * 100;
      console.log(percentEnd, percentEnd);
      progressRef.current.style.width =
        (percentEnd >= 100 ? 100 : percentEnd) + "%";
      if (percentEnd > 100) {
        clearInterval(countProgess);
      }
    }, 1000);

    return () => {
      clearInterval(countProgess);
    };
  }, [isClaimed]);

  const handleClaim = () => {
    clearInterval(countProgess);
    progressRef.current.style.width = 0;
    setisClaimed(!isClaimed);
  };

  return (
    <div className="h-screen px-4 relative bg-gradient-to-b from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2]">
      <div className="flex flex-col items-center">
        <p className="text-sm font-normal">In Storage:</p>
        <div className="flex items-center gap-2">
          <img
            src="/images/icons/token_icon.svg"
            width={44}
            height={44}
            alt="token"
          ></img>
          <p className="text-[40px] font-bold">0.00001</p>
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
            <p className="text-sm font-bold">0.00001</p>
          </div>
        </div>
        <div className=" top-[100px]">
          <img src="/images/tree_banner.png" width={326} alt=""></img>
        </div>
      </div>

      {/* storage button */}
      <div className="relative">
        <div className=" bg-white rounded-2xl p-4 w-full overflow-hidden">
          <div
            ref={progressRef}
            className="bg-[#E4FFCE]  h-full top-0 left-0 absolute z-0 rounded-2xl"
          ></div>
          <div className=" relative z-10 grid grid-cols-7 gap-3">
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
                  <p className="text-xs font-normal">0.001 SEED/hour</p>
                </div>
              </div>
            </div>
            <div className="flex items-center col-span-2 ">
              <Button
                onClick={handleClaim}
                className="w-full h-40px rounded-lg bg-gradient-to-r from-[#F9D52A] to-[#F54979] text-[#fff] text-sm font-bold"
              >
                Claim
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-3">
        <NavBar />
      </div>
    </div>
  );
};

export default Home;
