import clsx from "clsx";
import { useEffect, useState } from "react";
import { useVoting } from "../../../store/votingStore";
import ProgressBar from "./ProgressBar";

const VotePowerBtn = ({
  votingDetail,
  boostedCheck,
}: {
  votingDetail: any;
  boostedCheck: boolean;
}) => {
  const isVoted = useVoting((state: any) => state.isVoted);
  const setVotePower = useVoting((state: any) => state.setVotePower);
  const votePower = useVoting((state: any) => state.votePower);

  const voteConfig = votingDetail?.vote_config;

  const gameStartAt = new Date(votingDetail?.started_at).getTime();
  const gameEndAt = new Date(votingDetail?.ended_at).getTime();
  //   const now = new Date().getTime();

  const [now, setNow] = useState<any>(new Date().getTime());

  const powerConfig = () => {
    setNow(new Date().getTime());
    const timePass = ((now - gameStartAt) / (gameEndAt - gameStartAt)) * 100;
    voteConfig?.some((cf: any) => {
      if (timePass <= cf?.time_passed) {
        setVotePower(cf?.vote_power);
        return cf;
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    const powerInterval = setInterval(() => {
      powerConfig();
    }, 1000);
    return () => {
      clearInterval(powerInterval);
    };
  });

  return (
    <div
      // className="rounded-xl w-full"
      className={clsx(
        " relative flex font-bold text-[16px] text-white w-full rounded-xl",
        // isVoted
        //   ? "btn-hover border-b-[4px] border-[#4C7E0B]"
        //   : "border-b-[2px] border-[#00000050]"
        "border-b-[2px] border-[#00000050]"
      )}
    >
      <div className=" absolute top-0 right-0 left-0 rounded-t-xl overflow-hidden">
        <ProgressBar completed={votePower} />
      </div>
      <div
        // onClick={
        //   !isVoted
        //     ? undefined
        //     : () => {
        //         updateModal(
        //           undefined,
        //           `Vote power is now ${power}. Are you sure you want to vote again?`,
        //           MODAL_TYPE.REVOTE,
        //           chartData?.find((cm: any) => cm.name === name)?.index,
        //           name
        //         );
        //       }
        // }
        className={clsx(
          // isVoted && "cursor-pointer",
          "font-[500] text-[14px] grow w-full rounded-xl",
          "bg-white text-black flex items-center justify-center text-center",
          "pt-[15px] pb-3"
        )}
      >
        {isVoted ? (
          <span className=" text-center text-xs lsm:text-[14px]">
            {`Revote with ${
              boostedCheck ? votePower + " x 2" : votePower
            } power`}
            <p className="text-[10px] lsm:text-xs -mt-[2px] font-thin text-[#00000090]">
              {"Power drops 1 per hour"}
            </p>
          </span>
        ) : (
          `Vote power: ${votePower}`
        )}
      </div>
    </div>
  );
};

export default VotePowerBtn;
