import clsx from "clsx";

interface RecieveGiftModalProps {
  handleClose: () => void;
}

const RecieveGiftModal = ({ handleClose }: RecieveGiftModalProps) => {
  const isSmallScreen = window.innerHeight <= 520 ;
  return (
    <div
      onClick={handleClose}
      className="fixed z-50 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-70"
    >
      <div
        className={clsx(
          "h-screen w-screen overflow-hidden flex flex-col flex-1 px-4 pb-[140px] relative ",
          "dark:bg-transparent dark:bg-gradient-to-b from-transparent via-transparent to-transparent ",
          "bg-gradient-to-b from-[#F7FFEB] via-[#E4FFBE] to-[#79B22A]"
        )}
      >
        <div className="opacity-0">
          <div className="flex flex-col items-center flex-1 ">
            <p
              className={
                "dark:text-white text-base font-normal ,dark:text-white"
              }
            >
              In Storage:
            </p>
            <div className="flex items-center gap-2">
              <img
                src="/images/icons/token_icon.png"
                width={44}
                height={44}
                alt="token"
              ></img>
              <p className="dark:text-white text-[35px] font-black"></p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="dark:text-white text-base font-normal">
                SEED Balance:
              </p>
              <div className="flex items-center gap-1">
                <img
                  src="/images/icons/token_icon.png"
                  width={17}
                  height={17}
                  alt="token"
                ></img>
              </div>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "flex flex-1 max-h-[560px] justify-center bg-no-repeat bg-contain bg-center z-30 relative",
            isSmallScreen ? "mb-2 mt-2" : "mb-5 mt-4"
          )}
          style={{
            backgroundImage: "url('/images/trees/6.png')",
          }}
        >
          <img
            className="h-[110px] w-[88px] absolute right-0 -bottom-[30px]"
            src="/images/icons/arrowguide.png"
            alt=""
          ></img>
          <div className="text-white text-center font-semibold absolute -bottom-[55px]">
            Tap on the tree to <br />
            receive the gift
          </div>
        </div>

        <div className=" rounded-2xl  z-10 opacity-0">
          <div
            className={clsx(
              "max-h-[90px] min-h-[90px] ",
              isSmallScreen ? "mt-1" : ""
            )}
          >
            <div className="dark:gradient-border-mask-storage">
              <div
                className={clsx(
                  "rounded-2xl w-full relative overflow-hidden ",
                  "dark:bg-transparent",
                  "bg-white",
                  isSmallScreen ? "p-2" : "p-4"
                )}
              >
                {/* progess bar */}
                <div
                  className={clsx(
                    "h-full top-0 left-0 absolute z-10",
                    "dark:bg-[#112C0D]",
                    "bg-[#E4FFCE]"
                  )}
                ></div>

                {/* blur when has news */}

                <div className={clsx("relative z-10 grid grid-cols-8 gap-1")}>
                  <div className="col-span-2 flex items-center">
                    <div></div>
                  </div>
                  <div className="col-span-3 dark:text-white">
                    <p
                      className={
                        isSmallScreen
                          ? "font-extrabold  text-sm"
                          : "font-extrabold"
                      }
                    >
                      Storage
                    </p>
                    <div className="flex gap-[7px]">
                      {/* <img
                      src={
                        isFill
                          ? "/images/icons/time_checked.svg"
                          : "/images/icons/clock.svg"
                      }
                      width={14}
                      alt="clock"
                    ></img> */}
                      <p className="text-sm font-medium "></p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {/* <img
                        src="/images/icons/token_icon.png"
                        width={14}
                        height={14}
                        alt="token"
                      ></img> */}
                        <p className="text-xs font-normal "></p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end col-span-3 "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecieveGiftModal;
