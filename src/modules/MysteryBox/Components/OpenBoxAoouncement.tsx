import clsx from "clsx";
import { useScreenSize } from "../../../Hooks/useScreenSize";
import { LoadingButton } from "@mui/lab";

interface OpenBoxModalProps {
  handleClose: () => void;
  level: number;
  handleClaimBox: () => void;
  isLoading: boolean;
}

const OpenBoxAoouncement = ({
  handleClose,
  level,
  handleClaimBox,
  isLoading,
}: OpenBoxModalProps) => {
  const { height } = useScreenSize();

  return (
    <div className="fixed z-30 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-90">
      <div
        className={clsx(
          "h-screen w-screen overflow-hidden flex flex-col flex-1 justify-center px-4 pb-[140px]"
        )}
      >
        <div className="max-h-[180px] min-h-[100px] text-[#fff] flex items-end justify-center text-[24px] font-semibold">
          Congratulations!
        </div>
        <div
          className={clsx(
            "flex flex-1 max-h-[382px] justify-center bg-no-repeat bg-contain bg-center z-30 relative"
          )}
        >
          <div className=" absolute top-[50%] -translate-y-[50%]">
            <img className="flare" src="/images/box/flare.png?v=3" alt=""></img>
          </div>
          <div className="flex items-center justify-center w-full">
            <img
              src="/images/box/paper.png"
              alt=""
              className={clsx(
                "paper-firework-appear ",
                height <= 590 ? "w-[211px] h-[166px]" : "w-[311px] h-[266px]"
              )}
            ></img>
          </div>
          {level && (
            <img
              src={`/images/box/${level}.png`}
              alt=""
              className={clsx(
                "box-appear absolute top-[50%] -translate-y-[50%]",
                height <= 590 ? "w-[147px] h-[147px]" : "w-[197px] h-[197px]"
              )}
            ></img>
          )}
        </div>
        <div className="relative z-40 flex items-center justify-center flex-col">
          <p className="text-[18px] text-[#fff] font-black mt-10 mb-8">
            {`MYSTERY BOX LEVEL ${level}`}
          </p>
          <LoadingButton
            loading={isLoading}
            onClick={handleClaimBox}
            className={clsx(
              "py-[18px] w-[127px]  rounded-xl flex items-center justify-center ",
              "btn-hover bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]",
              "text-[#fff] font-extrabold",
              isLoading ? "drop-shadow-none" : "drop-shadow-[0_4px_0px_#4C7E0B]"
            )}
          >
            Claim
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default OpenBoxAoouncement;
