import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetAcountReferees from "../Hooks/useGetAcountReferees";
import { copyToClipboard } from "../../../utils/helper";
import { ToastContainer, toast } from "react-toastify";

const Friends = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;
  const userID = tele.initDataUnsafe?.user?.id;

  const AcountReferees = useGetAcountReferees();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());
  const handleBackBtn = () => {
    navigate("/");
  };

  const handleCopyLink = () => {
    copyToClipboard(
      `${process.env.REACT_APP_BOT_URL}/app?startapp=${String(userID)}`
    );

    toast.success("Invite link copied");
  };

  return (
    <div className="pt-[42px] px-4 bg-gradient-to-b h-screen from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
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
      {AcountReferees.data?.data.data &&
        AcountReferees.data?.data.data.map((item: any) => (
          <div className="mt-10">
            <p className="text-xl font-bold mb-4">My friends</p>
            <div className="grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full mb-4 drop-shadow-lg">
              <div className="col-span-2 flex ">
                <img
                  src="/images/icons/user.svg"
                  width={48}
                  height={48}
                  alt="avt"
                ></img>
              </div>
              <div className="col-span-5">
                <p className="text-sm font-normal mb-2">Ms. Thế Vinh</p>
                <div>
                  <div className="flex items-center gap-1">
                    <img
                      src="/images/icons/token_icon.svg"
                      width={18}
                      height={18}
                      alt="token"
                    ></img>
                    <p className="text-sm font-bold">0.2 SEED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="absolute bottom-[30px] right-4 left-4">
        <Button
          onClick={() => handleCopyLink()}
          startIcon={<img src="images/icons/copy.svg" alt="copy" />}
          className="font-bold bg-gradient-to-r from-[#FBB500] to-[#FB2963] text-white py-[18px] w-full rounded-xl drop-shadow-lg "
        >
          Copy invite link
        </Button>
      </div>
    </div>
  );
};

export default Friends;
