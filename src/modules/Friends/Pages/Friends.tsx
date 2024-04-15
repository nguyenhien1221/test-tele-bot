import React from "react";
import { Button } from "@mui/material";

const Friends = () => {
  return (
    <div className="pt-[42px] px-4 bg-gradient-to-b h-screen from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-3">
          <img
            className="h-[99px]"
            src="/images/icons/friends.png"
            width={119}
            height={99}
            alt="token"
          ></img>
          <p className="text-[24px] font-bold">1 Friends</p>
        </div>
        <p className="text-sm font-normal text-center">
          You will receive 20% of the PXLs
          <br />
          mined by your friend and 5% of the <br />
          PXLs mined by your friend's friend.
        </p>
      </div>

      {/* friends list */}
      <div className="mt-10">
        <p className="text-xl font-bold mb-4">My friends</p>
        <div className="grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full mb-4 drop-shadow-lg">
          <div className="col-span-2 flex ">
            <img
              src="/images/icons/user.svg"
              width={48}
              height={48}
              alt="avt"
            ></img>
          </div>
          <div className="col-span-5">
            <p className="text-sm font-normal mb-2">Ms. Thế Vinh</p>
            <div>
              <div className="flex items-center gap-1">
                <img
                  src="/images/icons/token_icon.svg"
                  width={18}
                  height={18}
                  alt="token"
                ></img>
                <p className="text-sm font-bold">0.2 SEED</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -bottom-[140px]">
        <Button
          startIcon={<img src="images/icons/copy.svg" alt="copy" />}
          className="font-bold bg-gradient-to-r from-[#FBB500] to-[#FB2963] text-white py-[18px] w-full rounded-xl drop-shadow-lg "
        >
          Copy invite link
        </Button>
      </div>
    </div>
  );
};

export default Friends;
