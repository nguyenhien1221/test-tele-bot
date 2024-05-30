import clsx from "clsx";
import useGetLeaderBoard from "../Hooks/useGetaLeaderBoard";
import {
  convertNumber,
  formatDecimals,
  formatNumberFloatFix,
} from "../../../utils/formatNumber";
import { useNavigate } from "react-router-dom";
import { navPaths } from "../../../constants/navbar.constants";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { useState } from "react";


const LeaderBoard = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;
  const LeaderBoardData = useGetLeaderBoard();

  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  tele.BackButton.onClick(() => handleBackBtn());
  const handleBackBtn = () => {
    navigate(navPaths.FRIENDS);
  };
  return (
    <div className="pt-[42px] px-4 pb-[100px] bg-[#F2FFE0] dark:bg-transparent h-screen relative z-30">
      <div className="flex items-center justify-center flex-col mb-5">
        <div className="relative">
          <img
            src="/images/leaderboard/mainicon.png"
            className="w-[90px] h-[90px] mb-[14px]"
            alt=""
          >
          </img>
          <ClickAwayListener onClickAway={() => { setIsTooltipOpen(false) }}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              arrow
              onClose={() => { setIsTooltipOpen(false) }}
              open={isTooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="This leaderboard ranks players by the number of seeds earned from referral bonuses"
              className="max-w-[230px] text-sm"
            >
              <button onClick={() => {
                setIsTooltipOpen(true)
                setTimeout(() => setIsTooltipOpen(false), 3000)
              }} className="absolute top-0 -right-3">
                <img
                  className="w-[18px] h-[18px]"
                  src="/images/leaderboard/info.png"
                  alt=""
                ></img>
              </button>
            </Tooltip></ClickAwayListener>

        </div>
        {/* <div className="text-center">
          <p className="dark:text-white">
            This leaderboard ranks players by the number of SEED earned from
            referral bonuses
          </p>
        </div> */}
      </div>
      {LeaderBoardData.data?.data.data?.length > 0 ? (
        <div
          className={clsx(
            "bg-white px-3  py-1 rounded-lg max-h-[calc(100%-100px)] overflow-auto",
            "dark:bg-transparent",
            "border-[1px] border-[#4D7F0C] border-solid "
          )}
        >
          <div >
            {LeaderBoardData.data?.data.data &&
              LeaderBoardData.data?.data.data.map(
                (item: any, index: number) => {
                  return (
                    <div key={item.id} className="grid grid-cols-9 gap-2 p-2 ">
                      <div className="col-span-1">
                        <div className="w-[30px] h-full flex items-center justify-center">
                          {item.rank < 4 ? (
                            <img
                              src={`/images/leaderboard/${item.rank}.png`}
                              className="w-[30px] h-[44px] "
                              alt=""
                            ></img>
                          ) : (
                            <p className="dark:text-white font-semibold">
                              {item.rank}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-8 flex gap-2">
                        <div className="flex items-center w-[50px] h-[50px]">
                          <img
                            src="/images/icons/user.svg"
                            className="w-[40px] h-[40px]"
                            alt=""
                          ></img>
                        </div>
                        <div className="w-full flex flex-col justify-center">
                          <p className="font-medium text-sm dark:text-white">
                            {item.name}
                          </p>
                          <div className="flex gap-0">
                            <div className="flex items-center w-[70px]">
                              <img
                                src="/images/icons/token_icon.png"
                                className="w-[16px] h-[17px] mr-1"
                                alt=""
                              ></img>
                              <span className="text-sm font-medium dark:text-white">
                                {convertNumber(
                                  Number(
                                    formatNumberFloatFix(
                                      formatDecimals(item.referral_balance),
                                      0
                                    )
                                  )
                                )}
                              </span>
                            </div>

                            <div className="flex items-center ">
                              <img
                                src="/images/leaderboard/amount.svg"
                                className="w-[16px] h-[17px] mr-1 block dark:hidden"
                                alt=""
                              ></img>
                              <img
                                src="/images/leaderboard/white_amount.svg"
                                className="w-[16px] h-[17px] mr-1 hidden dark:block"
                                alt=""
                              ></img>
                              <span className="text-sm font-medium dark:text-white">
                                {item.total_referred}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      ) : (
        <p className="dark:text-white text-center mt-10 font-black"></p>
      )}
    </div>
  );
};

export default LeaderBoard;
