import { useMutationState } from "@tanstack/react-query";
import clsx from "clsx";
import { Key, createRef, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/common/Loading";
import { MODAL_TYPE, useVoting } from "../../../store/votingStore";
import { getNumberFormatUs } from "../../../utils/formatNumber";
import useGetVotingGameDetail from "../Hooks/useGetVotingGameDetail";
import useGetVotingGames from "../Hooks/useGetVotingGames";
import useGetVotingParticipant from "../Hooks/useGetVotingParticipant";
import useVotingClaim from "../Hooks/useVotingClaim";
import ChartColumn from "./ChartColumn";
import VoteModal from "./VoteModal";
import VotePowerBtn from "./VotePowerBtn";

// function randomIntFromInterval(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

const VoteChart = ({
  gameId,
  treasureTotal,
  gameEndAt,
  className,
}: {
  gameId: any;
  treasureTotal: any;
  gameEndAt: any;
  className: string;
}) => {
  const isVoted = useVoting((state: any) => state.isVoted);
  const chartData = useVoting((state: any) => state.chartData);
  const updateChartData = useVoting((state: any) => state.updateChartData);
  const updateModal = useVoting((state: any) => state.updateModal);
  const showModal = useVoting((state: any) => state.showModal);
  const result = useVoting((state: any) => state.result);
  const setResult = useVoting((state: any) => state.setResult);

  const isEnd = useVoting((state: any) => state.isEnd);
  const updateVote = useVoting((state: any) => state.updateVote);

  const VotingGames = useGetVotingGames();
  const VotingGameDetail = useGetVotingGameDetail(gameId);
  const votingDetail = VotingGameDetail?.data?.data?.data;

  const VotingParticipant = useGetVotingParticipant(gameId);
  const votingParticipant = VotingParticipant?.data?.data?.data?.vote;
  const userReward = VotingParticipant?.data?.data?.data?.reward;
  const boostedCheck = VotingParticipant?.data?.data?.data?.vote?.boosted;

  const [waitingText, setWaitingText] = useState<any>();

  const DoClaim = useVotingClaim();

  useEffect(() => {
    votingDetail?.cms && handleChartData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingDetail]);

  const cmVotedName = chartData?.find(
    (cm: any) => cm?.id === votingParticipant?.cm_id
  )?.name;

  useEffect(() => {
    votingParticipant && updateVote(true);
    if (
      (votingParticipant &&
        votingDetail?.cms &&
        votingDetail?.cms[0]?.id === votingParticipant?.cm_id) ||
      votingDetail?.cms[votingDetail?.cms?.length - 1]?.id ===
        votingParticipant?.cm_id
    ) {
      setWaitingText(
        <p className="text-xs lsm:text-sm">
          Winning: You voted for{" "}
          <span className="font-[600]">{cmVotedName}</span> with{" "}
          {boostedCheck
            ? getNumberFormatUs(votingParticipant?.vote_power / 2) + " x 2"
            : votingParticipant?.vote_power}{" "}
          power
        </p>
      );
      setResult("win");
    } else {
      setWaitingText(
        <p className="text-xs lsm:text-sm">
          Not Winning: You voted for{" "}
          <span className="font-[600]">{cmVotedName}</span> with{" "}
          {boostedCheck
            ? getNumberFormatUs(votingParticipant?.vote_power / 2) + " x 2"
            : votingParticipant?.vote_power}{" "}
          power
        </p>
      );
      setResult("lose");
    }
    // (votingParticipant &&
    //   votingDetail?.cms &&
    //   votingDetail?.cms[0]?.id === votingParticipant?.cm_id) ||
    // votingDetail?.cms[votingDetail?.cms?.length - 1]?.id ===
    //   votingParticipant?.cm_id
    //   ? setWaitingText("You are winning")
    //   : setWaitingText("You are not winning");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingParticipant, chartData]);

  useEffect(() => {
    isEnd && showModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnd]);

  const handleChartData = (isRevote: boolean) => {
    if (isRevote) {
      updateChartData(
        chartData?.map((cm: any) => {
          return {
            ...cm,
            vote: 0,
          };
        })
      );
      return;
    }
    // const newData = chartData.map((cm: any, index: any) => {
    //   index === 0
    //     ? (cm.vote = randomIntFromInterval(1, 199))
    //     : index === 1
    //     ? (cm.vote = randomIntFromInterval(200, 399))
    //     : index === 2
    //     ? (cm.vote = randomIntFromInterval(400, 599))
    //     : index === 3
    //     ? (cm.vote = randomIntFromInterval(600, 799))
    //     : (cm.vote = randomIntFromInterval(800, 1000));
    //   return cm;
    // });

    const newData = votingDetail?.cms?.map((cm: any, index: any) => {
      return {
        index: index,
        vote: cm?.total_power,
        avatar: cm?.img_url,
        // avatar: `/images/voting/${index + 1}.png`,
        ...cm,
      };
    });
    updateChartData(newData);
    // updateChartData(
    //   DUMMY_DATA?.map((cm: any) => {
    //     return {
    //       ...cm,
    //       vote: 0,
    //     };
    //   })
    // );
  };

  useEffect(() => {
    isVoted && handleChartData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoted]);

  const voteChartRef = useRef<any>(null);
  const [chartHeight, setChartHeight] = useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    voteChartRef.current &&
      setChartHeight(voteChartRef.current.clientHeight - 39);
  });

  const [calculateResult, setCalculateResult] = useState(false);

  useEffect(() => {
    if (isVoted && isEnd) {
      const now = new Date().getTime();
      if (now - gameEndAt >= 10000) return;
      const calculateTime = 10000 - (now - gameEndAt);
      setCalculateResult(true);
      setTimeout(() => {
        setCalculateResult(false);
        VotingGames.refetch();
        VotingGameDetail.refetch();
        VotingParticipant.refetch();
      }, calculateTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoted, isEnd]);

  const reward =
    ((treasureTotal / 2) * votingParticipant?.vote_power) /
    votingDetail?.cms?.find((cm: any) => cm?.id === votingParticipant?.cm_id)
      ?.total_power;

  const handleClaim = () => {
    DoClaim.mutateAsync(gameId)
      .then(() => {
        toast.success("Claim success", {
          autoClose: 2000,
          style: { maxWidth: 337, height: 40, borderRadius: 8 },
        });
        VotingParticipant.refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 2000 });
        console.log(err);
      });
  };

  const handleBoostModal = () => {
    if (!isVoted) {
      return;
    }
    updateModal(
      ["/images/voting/boost-modal.png"],
      "X2 your vote power by inviting one more friend!",
      MODAL_TYPE.BOOST,
      chartData?.find((cm: any) => cm?.id === votingParticipant?.cm_id)?.index,
      chartData?.find((cm: any) => cm?.id === votingParticipant?.cm_id)?.name
    );
  };

  const [doVoteStatus, setDoVoteStatus] = useState<any>();

  const doVoteState: any = useMutationState<any>({
    filters: { mutationKey: ["DoVote"] },
    select: (mutation) => {
      return { status: mutation?.state?.status, error: mutation?.state?.error };
    },
  });

  useEffect(() => {
    const doVoteStatusCheck = doVoteState?.pop()?.status;
    setDoVoteStatus(doVoteStatusCheck);
  }, [doVoteState]);

  return (
    <>
      {VotingGameDetail.isLoading ? (
        <Loading />
      ) : (
        <div
          className={clsx(
            "grow mt-3 relative flex flex-col z-10 dark:text-white",
            className
          )}
        >
          {doVoteStatus === "pending" && (
            <Loading className=" absolute inset-0 z-[99] pb-[70%]" />
          )}
          {/* Chart */}
          <div
            ref={voteChartRef}
            className={clsx(
              " relative flex justify-center flex-row gap-3 grow px-4 overflow-hidden transition-all ease-linear duration-1000",
              doVoteStatus === "pending" && "blur-sm"
            )}
          >
            {chartData?.map((cm: any, index: Key | null | undefined) => {
              return (
                <ChartColumn
                  key={index}
                  cm={cm}
                  index={index}
                  chartHeight={chartHeight}
                  gameId={gameId}
                  ref={createRef()}
                />
              );
            })}
          </div>
          {/* End Chart */}

          {/* Footer */}
          <div className="relative bg-gradient-to-b from-[#9CDE42B2] to-[#F7FFEBB2] flex flex-col gap-2 lsm:gap-3 pb-[10px] lsm:pb-[30px]">
            <div className="flex justify-center flex-row gap-3 mt-1 px-4 ">
              {chartData?.map((cm: any, index: Key | null | undefined) => (
                <div
                  key={index}
                  className="text-center font-[600] text-[12px] flex-1 capitalize"
                >
                  {cm?.name}
                </div>
              ))}
            </div>

            {isVoted ? (
              <div className="flex flex-col gap-3">
                <div className="mx-3 rounded-[16px]  px-3 lsm:px-4 py-1 lsm:py-2 lsm:h-[40px] flex flex-row gap-3 items-center justify-center">
                  {isEnd && (
                    <div className="rounded-full overflow-hidden">
                      <img
                        src={
                          calculateResult
                            ? "/images/voting/calculate-result.png"
                            : chartData?.find(
                                (cm: any) => cm?.id === votingParticipant?.cm_id
                              )?.avatar
                        }
                        alt="top"
                        className={clsx(
                          "w-[52px] aspect-square object-contain",
                          calculateResult && "rotateVoting"
                        )}
                      />
                    </div>
                  )}
                  {isEnd && calculateResult && (
                    <div className="flex flex-col">
                      <div className="font-[500] text-black">
                        {
                          "Please wait while the system calculates the game result."
                        }
                      </div>
                    </div>
                  )}
                  {!isEnd && (
                    <div className="flex flex-col items-center justify-center">
                      <div className="font-[500] text-black">{waitingText}</div>
                    </div>
                  )}
                  {result === "win" && isEnd && !calculateResult && (
                    <div className="flex flex-col lsm:py-2">
                      <div className="font-[600] text-black">
                        Congratulations!
                      </div>
                      <div className="text-sm text-black">
                        You won: {getNumberFormatUs(reward, 6)} SEED
                      </div>
                    </div>
                  )}
                  {result === "lose" && isEnd && !calculateResult && (
                    <div className="flex flex-col">
                      <div className="font-[600] text-black">SO CLOSE!</div>
                      <div className="text-sm text-black">
                        (You still have{" "}
                        <span className=" capitalize">{cmVotedName}</span>)
                      </div>
                    </div>
                  )}
                </div>

                {result === "win" && isEnd && !calculateResult && (
                  <div
                    onClick={
                      !!userReward || DoClaim.isPending
                        ? undefined
                        : handleClaim
                    }
                    className={clsx(
                      "mx-3 font-bold text-[16px] text-white lsm:py-3 rounded-xl flex justify-center items-center",
                      !!userReward
                        ? "bg-[#b1b1b1] text-[#8d8d8d]"
                        : "btn-hover bg-gradient-to-r from-[#97C35B] to-[#61A700] cursor-pointer",
                      "border-b-[4px] border-[#4C7E0B] py-2"
                    )}
                  >
                    {!!userReward
                      ? "Claimed"
                      : DoClaim.isPending
                      ? "Claiming..."
                      : "Claim"}
                  </div>
                )}
              </div>
            ) : (
              <>
                {!isEnd && (
                  <div className="lsm:h-[80px] flex flex-col lsm:gap-2 items-center justify-center mx-3">
                    <div className="text-[20px]">
                      TAP ON CM YOU LOVE TO VOTE
                    </div>
                  </div>
                )}
              </>
            )}

            {/* {isEnd && isVoted && calculateResult && (
          <div className=" absolute inset-0 flex items-center justify-center">
            <div className="mx-3 rounded-[16px] bg-white/40 px-3 lsm:px-4 py-1 lsm:h-[80px] flex flex-row gap-3 items-center shadow-md">
              <div>
                <img
                  src="/images/voting/calculate-result.png"
                  alt="top"
                  className="h-[47px] rounded-full aspect-square object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-[500] text-black">{"Please wait while the system calculates the game result."}</div>
              </div>
            </div>
          </div>
        )} */}

            {isEnd && !isVoted && (
              <div className="lsm:h-[80px] flex flex-col items-center justify-center mx-3">
                <div className="font-[600] text-[20px]">GAME IS ENDED!</div>
              </div>
            )}
            {!isEnd && (
              <div className="flex gap-2 mx-3">
                <VotePowerBtn
                  votingDetail={votingDetail}
                  boostedCheck={boostedCheck}
                />

                {!boostedCheck ? (
                  <div
                    onClick={handleBoostModal}
                    className={clsx(
                      !isVoted
                        ? "pointer-events-none bg-[#b1b1b1] text-[#8d8d8d]"
                        : "btn-hover bg-gradient-to-r from-[#97C35B] to-[#61A700]",
                      "flex gap-1 justify-center items-center font-bold capitalize text-[16px] text-white lsm:py-3 w-[35%] rounded-xl ",
                      "border-b-[4px] border-[#4C7E0B] cursor-pointer"
                    )}
                  >
                    <img
                      src="images/voting/boost.png"
                      className="w-[30px] aspect-square object-contain"
                      alt="boost"
                    />
                    <div className="mt-1">x2</div>
                  </div>
                ) : (
                  <div
                    className={clsx(
                      "flex gap-1 justify-center items-center font-[800] capitalize text-[16px] lsm:py-3 w-[35%] rounded-xl ",
                      "bg-[#BACCA0] text-[#5D802C]"
                    )}
                  >
                    <div className="">Boosted</div>
                  </div>
                )}
              </div>
            )}

            {!isVoted && !isEnd && (
              <div className="text-xs text-center">
                The later you vote, the less vote power your vote has
              </div>
            )}
          </div>
          {/* End Footer */}
        </div>
      )}
      <VoteModal votingDetail={votingDetail} />
    </>
  );
};

export default VoteChart;
