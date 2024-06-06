import Countdown from "react-countdown";
import { useVoting } from "../../../store/votingStore";

const StartCountDown = ({ startAt }: { startAt: any }) => {
  const setEnd = useVoting((state: any) => state.setEnd);
  const setGameStart = useVoting((state: any) => state.setGameStart);

  return (
    <Countdown
      date={startAt}
      onComplete={() => {
        setGameStart(true);
        setEnd(false);
      }}
      renderer={({ days, hours, minutes, seconds }: any) => {
        return (
          <div className="flex flex-col items-center justify-center text-[20px] font-[600] dark:text-white">
            <p>Game starts after</p>
            <p>
              {days ? <span>{days}d:</span> : ""}
              {hours ? <span>{hours}h:</span> : ""}
              {minutes ? <span>{minutes}m:</span> : ""}
              <span>{seconds}s</span>
            </p>
          </div>
        );
      }}
    />
  );
};

export default StartCountDown;
