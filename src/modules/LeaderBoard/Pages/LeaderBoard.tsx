import clsx from "clsx";
import useGetLeaderBoard from "../Hooks/useGetaLeaderBoard";
import { formatDecimals, getNumberFormatUs } from "../../../utils/formatNumber";
import { useNavigate } from "react-router-dom";

const LeaderBoard = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;
  const LeaderBoardData = useGetLeaderBoard();

  tele.BackButton.onClick(() => handleBackBtn());
  const handleBackBtn = () => {
    navigate("/");
  };
  return (
    <div className="pt-[42px] px-4 pb-[100px] bg-[#F2FFE0] dark:bg-transparent h-screen relative z-30">
      <div className="flex items-center justify-center flex-col mb-5">
        <img
          src="/images/leaderboard/mainicon.png"
          className="w-[103px] h-[103px] mb-[14px]"
          alt=""
        ></img>
        <div className="text-center">
          <p className="text-2xl font-extrabold mb-2 dark:text-white">
            Leaderboard
          </p>
          <p className="dark:text-white">
            This leaderboard ranks players by the number of seeds earned from
            referral bonuses
          </p>
        </div>
      </div>
      {LeaderBoardData.data?.data.data.length > 0 ? (
        <div
          className={clsx(
            "bg-white p-4 rounded-lg  h-[calc(100%-160px)]",
            "dark:bg-transparent",
            "border-[1px] border-[#4D7F0C] border-solid "
          )}
        >
          <div className="h-full overflow-auto">
            {LeaderBoardData.data?.data.data &&
              LeaderBoardData.data?.data.data.map(
                (item: any, index: number) => {
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-10 mt-2 p-2 dark:gradient-border-mask-leaderboard"
                    >
                      <div className="col-span-1">
                        <div className="w-full h-full flex items-center justify-center">
                          {item.rank < 4 ? (
                            <img
                              src={`/images/leaderboard/${item.rank}.png`}
                              className="w-[395px] h-[44px] "
                              alt=""
                            ></img>
                          ) : (
                            <p className="dark:text-white font-semibold">
                              {item.rank}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-9 flex items-center">
                        <div className="ml-2 flex items-center">
                          <img
                            src="/images/icons/user.svg"
                            className="w-[46px] h-[48px] "
                            alt=""
                          ></img>
                        </div>
                        <div className="ml-2">
                          <p className="font-medium text-sm dark:text-white">
                            {item.name}
                          </p>
                          <div className="flex">
                            {/* <span className="flex items-center mr-1">
                              <img
                                src="/images/leaderboard/amount.png"
                                className="w-[16px] h-[17px] mr-1"
                                alt=""
                              ></img>
                              <span className="text-sm font-medium dark:text-white">
                                {item.total_referred}
                              </span>
                            </span>
                            <div className="w-3 h-[17px] flex items-center justify-center">
                              <img
                                src="/images/leaderboard/dot.png"
                                className="w-[4px] h-[4px] mr-1"
                                alt=""
                              ></img>
                            </div> */}
                            <span className="flex items-center">
                              <img
                                src="/images/icons/token_icon.png"
                                className="w-[16px] h-[17px] mr-1"
                                alt=""
                              ></img>
                              <span className="text-sm  dark:text-white">
                                +
                                {getNumberFormatUs(
                                  formatDecimals(item.referral_balance),
                                  6
                                )}
                              </span>
                            </span>
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
