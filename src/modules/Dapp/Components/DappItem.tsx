import { Button } from "@mui/material";
import clsx from "clsx";
import React from "react";
interface DappItemProps {
  dappItems: any[];
  numberOfItems: number;
}

const DappItem = ({ dappItems, numberOfItems }: DappItemProps) => {
  return (
    <div className="w-full bg-[#fff] rounded-2xl overflow-hidden border-[1px] border-[#4D7F0C] mb-5">
      <div className="w-full min-h-[138px] ">
        <img
          className="w-full"
          src={`/images/Dapp/${numberOfItems}.png`}
          alt=""
        ></img>
      </div>
      <div className="pt-[13px] pb-6 px-[20px]">
        <p className="font-extrabold mb-4">{`SECRET ${numberOfItems} // $TBA${numberOfItems}`}</p>
        <div className="w-[71px] h-[25px] bg-[#E1E1E1] py-1 px-[10px] text-sm font-medium rounded">
          <p className="leading-[16px] font-medium text-center">
            {numberOfItems === 2 ? "NFT" : "Smeme"}
          </p>
        </div>
        <div className="my-4">
          {dappItems.map((item) => {
            return (
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p className="text-[#2F2F2F]">{item.title}:</p>
                </div>
                <div className="col-span-1 text-right">
                  <p className="font-bold">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          disabled
          className={clsx(
            "btn-hover w-full capitalize bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]",
            "font-extrabold text-[#fff]",
            " disabled:text-[#8D8D8D]  disabled:bg-[#B1B1B1] disabled:drop-shadow-[0_4px_0px_#797979]"
          )}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export default DappItem;
