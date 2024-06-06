import clsx from "clsx";
import { forwardRef } from "react";
import { toast } from "react-toastify";
import { MODAL_TYPE, useVoting } from "../../../store/votingStore";
import { getNumberFormatUs } from "../../../utils/formatNumber";
import useGetVotingGameDetail from "../Hooks/useGetVotingGameDetail";
import useGetVotingParticipant from "../Hooks/useGetVotingParticipant";

const ChartColumn = forwardRef(
  (
    {
      cm,
      index,
      chartHeight,
      gameId,
    }: {
      cm: any;
      index: any;
      chartHeight: number;
      gameId: number;
    },
    ref: any
  ) => {
    const chartData = useVoting((state: any) => state.chartData);
    // const isVoted = useVoting((state: any) => state.isVoted);
    const isEnd = useVoting((state: any) => state.isEnd);

    const VotingParticipant = useGetVotingParticipant(gameId);
    const votingParticipant = VotingParticipant?.data?.data?.data?.vote;
    const VotingGameDetail = useGetVotingGameDetail(gameId);
    const votingDetail = VotingGameDetail?.data?.data?.data;
    const votePower = useVoting((state: any) => state.votePower);
    const boostedCheck = VotingParticipant?.data?.data?.data?.vote?.boosted;

    const notYetVote = votingDetail?.cms?.every((cm: any) => !cm?.total_power);

    const updateModal = useVoting((state: any) => state.updateModal);

    const handleVoteModal = (cm: any) => {
      if (isEnd) return;
      if (votingParticipant?.cm_id && votingParticipant?.cm_id === cm?.id) {
        toast.success("You have already voted for this CM", {
          style: {
            maxWidth: 337,
            height: 40,
            borderRadius: 8,
          },
          autoClose: 2000,
        });
        return;
      }
      if (votingParticipant?.cm_id && votingParticipant?.cm_id !== cm?.id) {
        updateModal(
          [
            cm?.avatar,
            chartData?.find((cm: any) => cm?.id === votingParticipant?.cm_id)
              ?.avatar,
          ],
          <p>
            {`Voted for ${
              chartData?.find((cm: any) => cm?.id === votingParticipant?.cm_id)
                ?.name
            } with ${
              boostedCheck
                ? getNumberFormatUs(votingParticipant?.vote_power / 2) + " x 2"
                : votingParticipant?.vote_power
            } power. `}
            <p>{`Do you want to revote for ${cm?.name} with ${
              boostedCheck ? votePower + " x 2" : votePower
            } power?`}</p>
          </p>,
          MODAL_TYPE.VOTE,
          index,
          cm?.name,
          cm
        );
        return;
      }

      updateModal(
        [cm?.avatar],
        <p>
          {`Vote for ${cm?.name}`}
          <p>
            Vote power: <span className="font-bold">{votePower}</span>
          </p>
        </p>,
        MODAL_TYPE.VOTE,
        index,
        cm?.name,
        cm
      );
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "flex flex-col flex-1 self-end relative",
          "transition-all duration-700 ease-linear",
          index !== chartData?.length - 1
            ? "min-h-[90px] lsm:min-h-[100px]"
            : index === chartData?.length - 1 && notYetVote
            ? "h-[90px] lsm:h-[100px]"
            : "min-h-[133px] lsm:min-h-[143px]",
          !cm?.vote && "h-[90px] lsm:h-[100px]",
          cm?.vote && index === 1 && "min-h-[95px] lsm:min-h-[105px]",
          cm?.vote && index === 2 && "min-h-[100px] lsm:min-h-[110px]",
          cm?.vote && index === 3 && "min-h-[105px] lsm:min-h-[115px]"
        )}
        style={{
          height:
            index !== chartData?.length - 1 && cm?.vote
              ? (cm?.vote / chartData[chartData.length - 1]?.vote) * chartHeight
              : "100%",
          // height: `calc(${(cm.vote / chartData[4].vote) * 100}% - 32px)`,
        }}
      >
        {index === 0 && !notYetVote && (
          <div className="absolute -top-[41px] left-0 right-0 font-[600] text-xs text-center mb-1">
            5th
            <p className="flex items-center justify-center -mt-[2px]">
              50%{" "}
              <img
                src="/images/voting/treasure.png"
                alt="treasure"
                className="w-[25px] h-[25px] object-contain"
              />
            </p>
          </div>
        )}
        {index === chartData?.length - 1 && !notYetVote && (
          <div className="font-[600] text-xs text-center mb-1">
            1st
            <p className="flex items-center justify-center -mt-[2px]">
              50%{" "}
              <img
                src="/images/voting/treasure.png"
                alt="treasure"
                className="w-[25px] h-[25px] object-contain"
              />
            </p>
          </div>
        )}
        <div
          className={clsx(
            !isEnd && "cm-avatar",
            !isEnd && "cursor-pointer",
            "bg-gradient-to-b rounded-t-full h-full flex flex-col gap-1",
            // (index === 0 || index === chartData?.length - 1) && !notYetVote
            //   ? "from-[#FFCE1F] to-[#FFCE1F70]"
            //   : "from-[#A1D953] to-[#A1D95370]"
            "from-[#A1D953] to-[#A1D95370]",
            votingParticipant?.cm_id === cm?.id &&
              "from-[#FFCE1F] to-[#FFCE1F70]",
            isEnd &&
              index !== 0 &&
              index !== chartData?.length - 1 &&
              " opacity-50"
          )}
          // onClick={() => handleDoVote(cm?.id)}
          onClick={() => handleVoteModal(cm)}
        >
          <img
            src={cm?.avatar}
            alt={cm?.id}
            className={clsx(
              index === 0 && "animate-delay-0",
              index === 1 && "animate-delay-75",
              index === 2 && "animate-delay-100",
              index === 3 && "animate-delay-150",
              index === 4 && "animate-delay-200",
              "w-full border-[3px] rounded-full aspect-square object-cover",
              // (index === 0 || index === chartData?.length - 1) && !notYetVote
              //   ? "border-[#FFCE1F] drop-shadow-[0_4px_0px_#00000050]"
              //   : "border-[#A1D953] drop-shadow-[0_4px_0px_#00000050]"
              "border-[#A1D953] drop-shadow-[0_4px_0px_#00000050]",
              votingParticipant?.cm_id === cm?.id &&
                "border-[#FFCE1F] drop-shadow-[0_4px_0px_#00000050]"
            )}
          />
          <div className="text-center text-[10px]">
            {getNumberFormatUs(cm?.vote)}
          </div>
        </div>
      </div>
    );
  }
);

export default ChartColumn;
