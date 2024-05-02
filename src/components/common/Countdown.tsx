import Cd from "react-countdown";

const containerClassName = "flex gap-0.5 items-center",
  valueClassName =
    "flex justify-center items-center text-sm font-medium tracking-tighter",
  descriptionClassName = "text-sm font-medium ";

interface CountdownProps {
  date: number | string;
  onComplete?: () => void;
}

export default function Countdown({ date, onComplete }: CountdownProps) {
  return date ? (
    <Cd
      date={date}
      onComplete={onComplete}
      renderer={({ hours, minutes }: any) => {
        return (
          <div className="grid grid-cols-[repeat(7,auto)] gap-[2px]">
            <div className={hours !== 0 ? containerClassName : "hidden"}>
              <div className={valueClassName}>{String(hours)}</div>
              <div className={descriptionClassName}>h</div>
            </div>

            <div className={minutes !== 0 ? containerClassName : "hidden"}>
              <div className={valueClassName}>{String(minutes)}</div>
              <div className={descriptionClassName}>m</div>
            </div>
            <div className="flex gap-0.5 items-center ml-[2px]">
              <div className={descriptionClassName}>to fill</div>
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
