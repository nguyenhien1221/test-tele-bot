import Cd from "react-countdown";
import NumberCycle from "./NumberCycle";

const containerClassName = "flex gap-0.5 items-center",
  valueClassName = "flex justify-center items-center text-base",
  descriptionClassName = "text-base ";

interface CountdownProps {
  date: number | string;
  onComplete?: () => void;
}

export default function Countdown({ date, onComplete }: CountdownProps) {
  return date ? (
    <Cd
      date={date}
      onComplete={onComplete}
      renderer={({ hours, minutes }) => {
        return (
          <div className="grid grid-cols-[repeat(7,auto)] gap-[6px]">
            <div className={containerClassName}>
              <div className={valueClassName}>
                {String(hours)
                  .padStart(2, "0")
                  .split("")
                  .map((item, idx) => (
                    <NumberCycle value={+item} key={idx} />
                  ))}
              </div>
              <div className={descriptionClassName}>h</div>
            </div>

            <div className={containerClassName}>
              <div className={valueClassName}>
                {String(minutes)
                  .padStart(2, "0")
                  .split("")
                  .map((item, idx) => (
                    <NumberCycle value={+item} key={idx} />
                  ))}
              </div>
              <div className={descriptionClassName}>m</div>
            </div>
          </div>
        );
      }}
      key={date}
    />
  ) : (
    <></>
  );
}
