import Cd from "react-countdown";

const containerClassName = "flex items-center",
  valueClassName =
    "flex justify-center items-center text-sm font-medium tracking-tighter",
  descriptionClassName = "text-sm font-medium ";

const showdayValueClassName =
    "flex justify-center items-center tracking-tighter w-[53px] h-[53px] rounded text-white font-bold text-[24px] bg-[#F2FFE0] border-y-[26px] border-t-[#9CC861] border-b-[#74B121]",
  showdaydescriptionClassName = "tracking text-[10px]",
  showdayContainerClassName = "flex flex-col justify-center items-center gap-1";

interface CountdownProps {
  date: number | string;
  onComplete?: () => void;
  isShowDay?: boolean;
}

export default function Countdown({
  date,
  onComplete,
  isShowDay,
}: CountdownProps) {
  return date ? (
    <Cd
      date={date}
      onComplete={onComplete}
      renderer={({ days, hours, minutes, seconds }: any) => {
        return !!isShowDay ? (
          <div className="grid grid-cols-[repeat(7,auto)] gap-[10px]">
            <div className={days !== 0 ? showdayContainerClassName : "hidden"}>
              <div className={showdayValueClassName}>
                {String(days).padStart(2, "0")}
              </div>
              <div className={showdaydescriptionClassName}>DAYS</div>
            </div>
            <div className="flex text-4xl text-[#86B04A] mt-[1px]">:</div>
            <div className={hours !== 0 ? showdayContainerClassName : "hidden"}>
              <div className={showdayValueClassName}>
                {String(hours).padStart(2, "0")}
              </div>
              <div className={showdaydescriptionClassName}>HOURS</div>
            </div>
            <div className="flex text-4xl text-[#86B04A] mt-[1px]">:</div>
            <div className={showdayContainerClassName}>
              <div className={showdayValueClassName}>
                {String(minutes).padStart(2, "0")}
              </div>
              <div className={showdaydescriptionClassName}>MINUTES</div>
            </div>{" "}
            <div className="flex text-4xl text-[#86B04A] mt-[1px]">:</div>
            <div className={showdayContainerClassName}>
              <div className={showdayValueClassName}>
                {String(seconds).padStart(2, "0")}
              </div>
              <div className={showdaydescriptionClassName}>SECONDS</div>
            </div>
          </div>
        ) : (
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
