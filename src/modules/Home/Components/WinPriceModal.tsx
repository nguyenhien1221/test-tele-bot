import { Button } from "@mui/material";
import clsx from "clsx";

interface RecieveGiftModalProps {
  handleClose: () => void;
  data: any;
}
const WinPriceModal = ({ handleClose, data }: RecieveGiftModalProps) => {
  return (
    <div className="fixed z-50 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-70">
      <div
        className={clsx(
          "h-screen w-screen overflow-hidden px-4 pb-[140px] relative flex justify-center items-end",
          "dark:bg-transparent dark:bg-gradient-to-b from-transparent via-transparent to-transparent "
        )}
      >
        <div
          className={clsx(
            "flex justify-center items-end bg-no-repeat bg-contain bg-center z-30 relative",
            "h-[284px] w-[289px] bg-[#F2FFE0] rounded-3xl"
          )}
        >
          <img
            className="h-[220px] w-[278px] absolute  -top-[125px]"
            src={`/images/${
              data?.data.data?.type === "seed" ? "winprice" : "winprice2"
            }.png`}
            alt=""
          ></img>
          <div className="text-center pb-[26px]">
            <p className="mb-2 text-[32px] font-extrabold">
              {`${data?.data.data?.type === "seed" ? "+" : "x"}${
                data?.data.data.name
              }`}
            </p>
            {data?.data.data?.type === "seed" ? (
              <p className="mb-6">
                Added to your balance already!
                <br /> Keep tapping next time!
              </p>
            ) : (
              <p className="mb-6">
                Valid within 24 hours from now.
                <br /> Keep tapping next time!
              </p>
            )}

            <Button
              onClick={handleClose}
              className={clsx(
                " capitalize text-[#fff] text-[16px] w-full bg-gradient-to-r from-[#97C35B] to-[#61A700]     drop-shadow-[0_4px_0px_#4C7E0B] ",
                "btn-hover disabled:bg-[#B1B1B1] disabled:drop-shadow-[0_4px_1px_#797979] disabled:border-[#C4C4C4]"
              )}
            >
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinPriceModal;
