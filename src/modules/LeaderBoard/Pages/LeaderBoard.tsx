import clsx from "clsx";
import useGetLeaderBoard from "../Hooks/useGetaLeaderBoard";
import {
  convertNumber,
  formatDecimals,
  formatNumberFloatFix,
  formatNumberUS,
} from "../../../utils/formatNumber";
import { useNavigate } from "react-router-dom";
import { navPaths } from "../../../constants/navbar.constants";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { useState } from "react";
import useGetUserRank from "../Hooks/useGetUserRank";

const LeaderBoard = () => {
  console.debug("cache prune - 2");
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;
  const LeaderBoardData = useGetLeaderBoard();
  const UserRank = useGetUserRank();

  const UserInfo = UserRank.data && UserRank.data?.data.data;

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

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
          ></img>
          <ClickAwayListener
            onClickAway={() => {
              setIsTooltipOpen(false);
            }}
          >
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              arrow
              onClose={() => {
                setIsTooltipOpen(false);
              }}
              open={isTooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="This leaderboard ranks players by the number of seeds earned from referral bonuses"
              className="max-w-[230px] text-sm"
            >
              <button
                onClick={() => {
                  setIsTooltipOpen(true);
                  setTimeout(() => setIsTooltipOpen(false), 3000);
                }}
                className="absolute top-0 -right-3"
              >
                <img
                  className="w-[18px] h-[18px]"
                  src="/images/leaderboard/info.png"
                  alt=""
                ></img>
              </button>
            </Tooltip>
          </ClickAwayListener>
        </div>
        {/* <div className="text-center">
          <p className="dark:text-white">
            This leaderboard ranks players by the number of SEED earned from
            referral bonuses
          </p>
        </div> */}
      </div>

      {LeaderBoardData.data?.data.data?.length > 0 && (
        <div
          className={clsx(
            "bg-white px-2 py-1 rounded-2xl max-h-[calc(100%-65px)] overflow-auto",
            "dark:bg-transparent",
            "border-[1px] border-[#4D7F0C]  border-solid "
          )}
        >
          <div className="h-[54px] z-40 liner_bg dark:dark_liner_bg absolute bottom-[103px] left-[17px] right-[17px] drop-shadow-sm dark:drop-shadow-[0px, 10px, 2px, #fff]"></div>
          <div
            className={clsx(
              "h-[64px] bg-white z-60 absolute left-4 right-4",
              "border-b-[1px] border-l-[1px] border-r-[1px] border-[#4D7F0C]  border-solid rounded-b-2xl",
              "absolute bottom-[40px] left-4 right-4",
              "dark:text-white dark:bg-black "
            )}
          >
            <div className="grid grid-cols-9 gap-2 p-2 ">
              <div className="col-span-2 ">
                <div className="min-w-[60px] h-full flex items-center justify-center">
                  <p className={clsx("dark:text-white font-semibold", "")}>
                    {UserInfo?.rank === 0
                      ? "--"
                      : formatNumberUS(UserInfo?.rank)}
                  </p>
                </div>
              </div>

              <div className="col-span-7 flex gap-2">
                <div className="flex items-center w-[50px] h-[50px]">
                  <img
                    src="/images/icons/user.png?v=3"
                    className="w-[40px] h-[40px]"
                    alt=""
                  ></img>
                </div>
                <div className="w-full flex flex-col justify-center">
                  <p className="font-medium text-sm dark:text-white">
                    {UserInfo?.name}
                  </p>
                  <div className="flex gap-0">
                    <div className="flex items-center w-[70px]">
                      <img
                        src="/images/icons/token_icon.png?v=3"
                        className="w-[16px] h-[17px] mr-1"
                        alt=""
                      ></img>
                      <span className="text-sm font-medium dark:text-white">
                        {convertNumber(
                          Number(
                            formatNumberFloatFix(
                              formatDecimals(UserInfo?.referral_balance),
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
                        {UserInfo?.total_referred}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              {LeaderBoardData.data?.data.data &&
                LeaderBoardData.data?.data.data.map(
                  (item: any, index: number) => {
                    return (
                      <div key={item.id} className="grid grid-cols-9  p-2 ">
                        <div className="col-span-2">
                          <div className="w-[60px] h-full flex items-center justify-center">
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

                        <div className="col-span-7 flex gap-2">
                          <div className="flex items-center w-[50px] h-[50px]">
                            <img
                              src="/images/icons/user.png?v=3"
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
                                  src="/images/icons/token_icon.png?v=3"
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
              <div className="grid grid-cols-9  p-2 ">
                <div className="col-span-2">
                  <div className="w-[60px] h-full flex items-center justify-center"></div>
                </div>

                <div className="col-span-7 flex gap-2">
                  <div className="flex items-center w-[50px] h-[50px]">
                    <img
                      src="/images/icons/user.svg"
                      className="w-[40px] h-[40px]"
                      alt=""
                    ></img>
                  </div>
                  <div className="w-full flex flex-col justify-center">
                    <p className="font-medium text-sm dark:text-white"></p>
                    <div className="flex gap-0">
                      <div className="flex items-center w-[70px]">
                        <img
                          src="/images/icons/token_icon.png?v=3"
                          className="w-[16px] h-[17px] mr-1"
                          alt=""
                        ></img>
                        <span className="text-sm font-medium dark:text-white"></span>
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
                        <span className="text-sm font-medium dark:text-white"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
