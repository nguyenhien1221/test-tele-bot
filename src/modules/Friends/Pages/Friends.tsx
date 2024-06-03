import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetAcountReferees from "../Hooks/useGetAcountReferees";
import { Slide, ToastContainer, toast } from "react-toastify";
import clsx from "clsx";
import { navPaths } from "../../../constants/navbar.constants";
import { formatDecimals } from "../../../utils/formatNumber";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Friends = () => {
  const mode = localStorage.getItem("mode");
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;

  const userID = tele.initDataUnsafe?.user?.id;
  const isSmallScreen = window.innerHeight <= 520;

  const AcountReferees = useGetAcountReferees();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());
  const handleBackBtn = () => {
    navigate("/");
  };

  const defaultInviteTextEncoded = `%F0%9F%98%8D%20%20SEED%20App%20-%20where%20every%20SEED%20is%20the%20genesis%20of%20everything.%0A%0AJoin%20now%20with%20me%20as%20an%20early%20bird%20%E2%80%94%20SEED%20just%20launched%20with%20huge%20potential%21%0A%0APlant-to-earn%20from%20thousands%20of%20Web3%20projects%20in%20SEED%20ecosystem%20with%20me.%0A%F0%9F%A5%B3%20%2B0.1%20SEED%20as%20a%20welcome%20gift%0A%F0%9F%92%B2Earn%2020%25%20cashback%20from%20frens`;

  const totalRefAmount =
    (AcountReferees?.data?.data?.data || []).reduce(
      (total: any, item: any) => total + item.received_amount,
      0
    ) || 0;

  const handleCopyLink = () => {
    toast.success("Link copied to clipboard", {
      autoClose: 2000,
      style: { maxWidth: 337, height: 40, borderRadius: 8 },
    });
  };

  const handleShareLink = () => {
    tele.openTelegramLink(
      `https://t.me/share/url?url=${
        process.env.REACT_APP_BOT_URL
      }startapp=${String(userID)}&text=${defaultInviteTextEncoded}`
    );
  };

  const handleNavigateLeaderBoard = () => {
    navigate(navPaths.LEADERBOARD);
  };

  return (
    <div className="pt-[42px] px-4 pb-[100px] bg-[#F2FFE0] dark:bg-transparent h-screen fixed bottom-0 z-30">
      <ToastContainer
        position="top-left"
        closeOnClick
        transition={Slide}
        hideProgressBar
        limit={1}
        className="top-3 max-w-[337px] left-[50%] -translate-x-[50%]"
      />
      <div className="mb-5 pb-1">
        <button
          onClick={handleNavigateLeaderBoard}
          className="btn-hover bg-white w-full border-[1px] border-[#4D7F0C] drop-shadow-[0_4px_0px_#4D7F0C] py-[6px] px-[7px] rounded-[30px]"
        >
          <div className="grid grid-cols-10">
            <span className="col-span-9 text-left flex items-center">
              <img
                src="/images/leaderboard/leaderboardicon.png"
                className="w-[37px] h-[34px] col-span-1"
                alt=""
              ></img>
              <p className="text-sm font-semibold pl-2">Referral leaderboard</p>
            </span>
            <div className="col-span-1 flex items-center justify-center">
              <svg
                width="8"
                height="16"
                viewBox="0 0 6 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.6875 1.3125L5.6875 5.28125C5.875 5.5 6 5.75 6 6C6 6.21875 5.875 6.5 5.6875 6.6875L1.6875 10.6562C1.40625 10.9375 0.96875 11.0312 0.59375 10.875C0.21875 10.7188 0 10.4062 0 10V2C0 1.625 0.21875 1.25 0.59375 1.09375C0.96875 0.9375 1.40625 1.03125 1.6875 1.3125Z"
                  fill={mode === "dark" ? "black" : "black"}
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center dark:text-white">
        <div className="flex items-center gap-3">
          <img
            className="h-[31px] w-[31px]"
            src="/images/icons/token_icon.png"
            width={119}
            height={99}
            alt="token"
          ></img>
          <p className="text-[32px] font-extrabold">
            {`${formatDecimals(totalRefAmount ?? 0).toFixed(6)}`}
          </p>
        </div>
        <p className="text-sm font-normal text-center">
          Earn 20% cashback whenever your friend claims SEED. Double cashback if
          they're premium.
        </p>
      </div>

      {/* friends list */}
      {AcountReferees.data?.data.data?.length > 0 && (
        <>
          <p
            className={clsx(
              "font-bold ",
              isSmallScreen ? "text-base my-2" : "text-base mb-2 mt-2",
              "dark:text-white"
            )}
          >
            {`Friend list (${AcountReferees.data?.data.data?.length})`}
          </p>
          {/* <div className="text-[12px] min-h-[30px] text-[#384426] bg-[#DEEBCC] py-2 px-[10px] rounded-lg mb-3 text-center">
            The friendlist will be updated soon due to maintenance
          </div> */}
        </>
      )}
      {AcountReferees.data?.data.data?.length > 0 && (
        <div
          className={clsx(
            "overflow-auto bg-white p-3 rounded-lg",
            isSmallScreen
              ? "max-h-[calc(100%-200px)]"
              : "max-h-[calc(100%-230px)]",
            "border-[1px] border-[#97C35B] border-solid dark:bg-transparent"
          )}
        >
          {AcountReferees.data?.data.data &&
            AcountReferees.data?.data.data
              .sort((a: any, b: any) => b.is_premium - a.is_premium)
              .map((item: any) => (
                <div
                  className={clsx(
                    "grid grid-cols-10 gap-3 bg-white rounded-2xl py-4 px-2 w-full  ",
                    " dark:bg-transparent dark:text-white"
                  )}
                >
                  <div className="col-span-2 flex ">
                    <img
                      src="/images/icons/user.svg"
                      width={48}
                      height={48}
                      alt="avt"
                    ></img>
                  </div>
                  <div className="col-span-8">
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm font-extrabold ">{item.name}</p>
                      {item.is_premium && (
                        <span className="h-[18px] w-full flex items-center">
                          <img
                            className="w-4 h-[14px] dark:hidden block"
                            src="/images/leaderboard/indicator.svg"
                            alt=""
                          ></img>
                          <img
                            className="w-4 h-[14px] dark:block hidden"
                            src="/images/leaderboard/white_indicator.svg"
                            alt=""
                          ></img>
                          <p className="ml-1 text-[12px] text-[#7D7D7D]">
                            x2 cashback
                          </p>
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#7D7D7D] dark:text-white text-sm">
                          You received:
                        </span>
                        <img
                          src="/images/icons/token_icon.png"
                          width={18}
                          height={18}
                          alt="token"
                        ></img>
                        <p className="text-sm font-bold">
                          {formatDecimals(item.received_amount).toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}

      <div className="absolute bottom-[30px] right-4 left-4">
        <div className="flex">
          <Button
            onClick={() => handleShareLink()}
            className={clsx(
              "font-bold capitalize text-[16px] text-white py-[18px] w-full rounded-xl ",
              "btn-hover  bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
            )}
          >
            Invite
          </Button>
          <CopyToClipboard
            text={`${process.env.REACT_APP_BOT_URL}startapp=${String(userID)}`}
          >
            <Button
              onClick={() => handleCopyLink()}
              startIcon={<img src="images/icons/copy.svg" alt="copy" />}
              className={clsx(
                "font-bold capitalize text-[16px] text-white py-[18px] w-full rounded-xl ",
                "btn-hover  bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
              )}
            ></Button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default Friends;
