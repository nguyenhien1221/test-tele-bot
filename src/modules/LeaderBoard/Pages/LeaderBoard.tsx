import clsx from "clsx";
import useGetLeaderBoard from "../Hooks/useGetaLeaderBoard";

const LeaderBoard = () => {
  const LeaderBoardData = useGetLeaderBoard();
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
          <p className="dark:text-white">Update content</p>
        </div>
      </div>
      {LeaderBoardData.data?.data.data.length > 0 ? (
        <div
          className={clsx(
            "bg-white p-4 rounded-lg drop-shadow-lg h-[calc(100%-160px)]",
            "dark:bg-transparent"
          )}
        >
          <div className="h-full overflow-auto">
            {LeaderBoardData.data?.data.data &&
              LeaderBoardData.data?.data.data.map(
                (item: any, index: number) => {
                  return (
                    <div className="grid grid-cols-10  py-2 dark:gradient-border-mask-leaderboard">
                      <div className="col-span-1 flex items-center">
                        {item.rank < 4 ? (
                          <img
                            src={`/images/leaderboard/${item.rank}.png`}
                            className="w-[395px] h-[44px] "
                            alt=""
                          ></img>
                        ) : (
                          <p className="text-sm font-semibold">{item.rank}</p>
                        )}
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
                          <p className="text-sm font-semibold dark:text-white">
                            {item.name}
                          </p>
                          <div className="flex">
                            <span className="flex items-center mr-1">
                              <img
                                src="/images/leaderboard/amount.png"
                                className="w-[16px] h-[17px] mr-1"
                                alt=""
                              ></img>
                              <span className="text-sm font-medium dark:text-white">
                                {item.total_referred}
                              </span>
                            </span>
                            {/* <div className="w-3 h-[17px] flex items-center justify-center">
                              <img
                                src="/images/leaderboard/dot.png"
                                className="w-[4px] h-[4px] mr-1"
                                alt=""
                              ></img>
                            </div> */}
                            {/* <span className="flex items-center">
                              <img
                                src="/images/icons/token_icon.png"
                                className="w-[16px] h-[17px] mr-1"
                                alt=""
                              ></img>
                              <span className="text-sm font-medium dark:text-white">{`+120.5`}</span>
                            </span> */}
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
        <p className="dark:text-white text-center mt-10 font-black">No data</p>
      )}
    </div>
  );
};

export default LeaderBoard;
