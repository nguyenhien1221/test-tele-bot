import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import VoteChart from "../Components/VoteChart";
import useGetVotingGameDetail from "../Hooks/useGetVotingGameDetail";
import useGetVotingGames from "../Hooks/useGetVotingGames";
import Loading from "../../../components/common/Loading";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { useState } from "react";
import { useVoting } from "../../../store/votingStore";
import StartCountDown from "../Components/StartCountDown";
import EndCountDown from "../Components/EndCountDown";
import { navPaths } from "../../../constants/navbar.constants";
import { getNumberFormatUs } from "../../../utils/formatNumber";

const Voting = () => {
  console.debug("cache prune");
  const navigate = useNavigate();

  const tele = window.Telegram.WebApp;
  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());
  const handleBackBtn = () => {
    navigate("/");
  };

  const VotingGames = useGetVotingGames();
  const votingGames = VotingGames?.data?.data?.data;

  const gameStartAt = new Date(
    votingGames && votingGames[0]?.started_at
  ).getTime();
  const gameEndAt = new Date(votingGames && votingGames[0]?.ended_at).getTime();
  const treasuryBase =
    Number(votingGames && votingGames[0]?.treasury_base) / 10 ** 9;
  const treasuryPerVote =
    Number(votingGames && votingGames[0]?.treasury_per_vote) / 10 ** 9;

  const treasuryCap =
    Number(votingGames && votingGames[0]?.treasury_cap) / 10 ** 9;

  const totalVote = Number(votingGames && votingGames[0]?.total_vote);
  const gameId = votingGames && votingGames[0]?.id;
  const gameSeason = votingGames && votingGames[0]?.season;

  const VotingGameDetail = useGetVotingGameDetail(gameId);
  const votingDetail = VotingGameDetail?.data?.data?.data;

  // const VotingGameDetail = useGetVotingGameDetail(gameId);
  // const votingDetail = VotingGameDetail?.data?.data?.data;
  const treasureTotal =
    treasuryBase + treasuryPerVote * totalVote < treasuryCap
      ? treasuryBase + treasuryPerVote * totalVote
      : treasuryCap;

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const gameStarted = useVoting((state: any) => state.gameStarted);

  return (
    <>
      <ToastContainer
        position="top-left"
        closeOnClick
        transition={Slide}
        hideProgressBar
        limit={1}
        stacked
        className="top-3 max-w-[337px] left-[50%] -translate-x-[50%]"
      />
      {VotingGames.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="pt-5 bg-[#F2FFE0] dark:bg-transparent h-screen flex flex-col relative z-30">
            {votingGames && votingGames?.length > 0 ? (
              <>
                {/* Header */}
                <div className="relative z-40 px-4 flex flex-col gap-[5px] lsm:gap-[10px]">
                  <div className="bg-[#DEEBCC] rounded-[6px] px-[8px] py-[6px]">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-center ">
                        Game #{gameSeason}{" "}
                        {/* <span className="font-[400] text-[12px]">- end after 3d14h</span> */}
                      </span>
                      {!gameStarted && (
                        <div className="flex items-center justify-center absolute inset-0 h-[100vh] z-[99]">
                          <StartCountDown startAt={gameStartAt} />
                        </div>
                      )}
                      {gameStarted && <EndCountDown endAt={gameEndAt} />}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 dark:text-white font-semibold">
                    <div className="text-[18px] lsm:text-[22px]">Treasure:</div>
                    <img
                      src="/images/voting/treasure.png"
                      alt="treasure"
                      className="w-[44px] h-[44px] object-contain"
                    />
                    <div className="text-[18px] lsm:text-[22px]">
                      {getNumberFormatUs(treasureTotal, 1) || "-"} SEED
                    </div>

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
                        title="The more players the game has, the bigger treasure is"
                        className="max-w-[230px] text-sm"
                      >
                        <button
                          onClick={() => {
                            setIsTooltipOpen(true);
                            setTimeout(() => setIsTooltipOpen(false), 3000);
                          }}
                          className="ml-2"
                        >
                          <img
                            className="w-[25px] h-[25px]"
                            src="/images/leaderboard/info.png"
                            alt="voting-more-info"
                          ></img>
                        </button>
                      </Tooltip>
                    </ClickAwayListener>
                  </div>

                  {votingDetail && (
                    <>
                      <div className="font-normal text-xs lsm:text-sm leading-[15px] text-[#58604D] dark:text-white -mt-2 lsm:-mt-1">
                        {/* At the end, top 1 and {votingDetail?.cms?.length} voters
                    share rewards */}
                        Players who votes for 1st and 5th CM share rewards
                      </div>
                    </>
                  )}
                  <div
                    onClick={() => navigate(navPaths.TUT)}
                    className="text-[#4C7E0B] dark:text-[#A1D953] font-semibold text-[16px] cursor-pointer absolute -bottom-8 left-4 z-40"
                  >
                    How to play
                  </div>
                </div>
                {/* End Header */}

                <VoteChart
                  className={(!gameStarted && "pointer-events-none blur") || ""}
                  gameId={gameId}
                  treasureTotal={treasureTotal}
                  gameEndAt={gameEndAt}
                />
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center font-semibold text-center text-[16px] dark:text-white">
                Stay tuned
                <br />
                for the next game 😉
              </div>
            )}
            {/* Background Img */}
            <div className="z-0 absolute top-0 bottom-0 -left-10 -right-10">
              <img
                src="/images/icons/token_icon.png"
                alt="token"
                className="w-full h-full object-contain opacity-15"
              ></img>
            </div>
            {/* End Background Img */}
          </div>
        </>
      )}
    </>
  );
};

export default Voting;
