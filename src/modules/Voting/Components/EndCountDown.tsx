import Countdown from "react-countdown";
import { useVoting } from "../../../store/votingStore";

const EndCountDown = ({ endAt }: { endAt: any }) => {
  const setEnd = useVoting((state: any) => state.setEnd);

  return (
    <Countdown
      date={endAt}
      // date={Date.now() + 500000000}
      // date={Date.now() + 10000}
      // onTick={handleOnTick}
      onComplete={() => {
        setEnd(true);
      }}
      renderer={({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
          return <div className="text-sm">- Ended</div>;
        }
        return (
          <div className="text-sm">
            - ends after {days ? <span>{days}d:</span> : ""}
            {hours ? <span>{hours}h:</span> : ""}
            {minutes ? <span>{minutes}m:</span> : ""}
            <span>{seconds}s</span>
          </div>
        );
      }}
    />
  );
};

export default EndCountDown;
