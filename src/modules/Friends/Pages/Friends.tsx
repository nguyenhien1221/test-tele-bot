import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetAcountReferees from "../Hooks/useGetAcountReferees";
import { copyToClipboard } from "../../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import clsx from "clsx";

const Friends = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;

  const userID = tele.initDataUnsafe?.user?.id;
  const isSmallScreen = window.innerHeight <= 520 ? true : false;

  const AcountReferees = useGetAcountReferees();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());
  const handleBackBtn = () => {
    navigate("/");
  };

  const handleCopyLink = () => {
    copyToClipboard(
      `${process.env.REACT_APP_BOT_URL}startapp=${String(userID)}`
    );

    toast.success("link copied to clipboard", { autoClose: 2000 });
  };

  return (
    <div className="pt-[42px] px-4 pb-[100px] bg-[#F2FFE0] h-screen ">
      <ToastContainer
        limit={1}
        stacked
        className="top-3 w-[272px] left-[50%] -translate-x-[50%]"
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-3">
          <img
            className="h-[99px]"
            src="/images/navbar/friends.png"
            width={119}
            height={99}
            alt="token"
          ></img>
          <p className="text-[24px] font-bold">{`${
            AcountReferees.data?.data.data.length ?? 0
          } Friends`}</p>
        </div>
        <p className="text-sm font-normal text-center">
          Every time your friend claims SEED
          <br />
          you get 20% cashback.
        </p>
      </div>

      {/* friends list */}
      {AcountReferees.data?.data.data.length > 0 && (
        <p
          className={clsx(
            " font-bold ",
            isSmallScreen ? "text-base my-2" : "text-xl mb-4 mt-10"
          )}
        >
          My friends
        </p>
      )}
      <div
        className={clsx(
          "overflow-auto ",
          isSmallScreen ? "h-[calc(100%-227px)]" : "h-[calc(100%-271px)]"
        )}
      >
        {AcountReferees.data?.data.data &&
          AcountReferees.data?.data.data.map((item: any) => (
            <div className="grid grid-cols-10 gap-3 bg-white rounded-2xl p-4 w-full mb-4 drop-shadow-lg">
              <div className="col-span-2 flex ">
                <img
                  src="/images/icons/user.svg"
                  width={48}
                  height={48}
                  alt="avt"
                ></img>
              </div>
              <div className="col-span-8">
                <p className="text-sm font-extrabold mb-1">{item.name}</p>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#7D7D7D] text-sm">
                      You recieved:
                    </span>
                    <img
                      src="/images/icons/token_icon.png"
                      width={18}
                      height={18}
                      alt="token"
                    ></img>
                    <p className="text-sm font-bold">
                      {item.received_amount.toFixed(6)} SEED
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="absolute bottom-[30px] right-4 left-4">
        <Button
          onClick={() => handleCopyLink()}
          startIcon={<img src="images/icons/copy.svg" alt="copy" />}
          className="font-bold capitalize bg-[#7AB32B] text-white py-[18px] w-full rounded-xl drop-shadow-lg "
        >
          Copy invite link
        </Button>
      </div>
    </div>
  );
};

export default Friends;
