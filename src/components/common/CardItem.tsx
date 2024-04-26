import { Button } from "@mui/material";
import React from "react";

const CardItem = () => {
  return (
    <div className="grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full">
      <div className="col-span-2">
        <img src="/images/icons/storage1.svg" width={62} alt="storage"></img>
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
              src="/images/icons/token_icon.png"
              width={14}
              height={14}
              alt="token"
            ></img>
            <p className="text-xs font-normal">0.001 SEED/hour</p>
          </div>
        </div>
      </div>
      <div className="flex items-center col-span-2 ">
        <Button className="w-full h-40px rounded-2xl bg-gradient-to-r from-[#F9D52A] to-[#F54979] text-[#fff] text-sm font-bold">
          Claim
        </Button>
      </div>
    </div>
  );
};

export default CardItem;
