import clsx from "clsx";
import Countdown from "../../../components/common/Countdown";
import { useScreenSize } from "../../../Hooks/useScreenSize";
import { useNavigate } from "react-router-dom";
import { navPaths } from "../../../constants/navbar.constants";
import { useBoxSettings } from "../../../store/boxSettingsStore";
import useGetMyBox from "../Hooks/useGetMyBox";
import Loading from "../../../components/common/Loading";

const MainBox = () => {
  const tele = window.Telegram.WebApp;
  const navigate = useNavigate();
  const { height } = useScreenSize();
  const BoxSettings = useBoxSettings((state: any) => state.myBoxSettings);
  const MyBox = useGetMyBox();

  const boxLevel =
    MyBox.data?.data?.data?.level + MyBox.data?.data?.data?.upgrades?.length;

  const OPEN_BOX_DAY = Number(new Date(BoxSettings.open_box_after).getTime());

  const isAbleToOpenBox = new Date().getTime() >= OPEN_BOX_DAY;

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const handleBackBtn = () => {
    navigate("/");
  };

  const handleGetLevelUpBox = () => {
    navigate(navPaths.UPGRADE_BOX);
  };

  return (
    <>
      <div
        className={clsx(
          "pt-[42px] px-4 pb-[100px] bg-[#F2FFE0] dark:bg-transparent h-screen relative z-30",
          "flex flex-col flex-1 item"
        )}
      >
        <div
          className={clsx(
            "w-full ",
            "flex flex-col items-center justify-center gap-5",
            height > 590 ? "mb-[82px]" : "mb-10"
          )}
        >
          <>
            <p>Unbox in:</p>
            <Countdown isShowDay date={OPEN_BOX_DAY} />
          </>
        </div>
        {MyBox.isPending ? (
          <Loading />
        ) : (
          <>
            <div
              className="flex flex-1 max-h-[250px] relative justify-center bg-no-repeat bg-contain bg-center"
              style={{
                backgroundImage: `url('/images/box/${boxLevel}.png?v=3')`,
              }}
            ></div>
            <div className="flex items-center flex-col mt-8 mb-4">
              <p className="dark:text-[#fff] font-semibold mb-3">{`Mystery Box ${boxLevel}`}</p>
            </div>
          </>
        )}
        <div className="absolute bottom-[30px] right-4 left-4">
          <div className="col-span-3">
            {isAbleToOpenBox ? (
              <button
                className={clsx(
                  "font-extrabold text-white py-[18px] w-full rounded-xl flex items-center justify-center gap-2",
                  "btn-hover bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
                )}
              >
                Open
              </button>
            ) : (
              <button
                onClick={() =>
                  boxLevel !== BoxSettings.max_box_level &&
                  handleGetLevelUpBox()
                }
                className={clsx(
                  "py-[18px] w-full rounded-xl flex items-center justify-center gap-2",
                  boxLevel === BoxSettings.max_box_level
                    ? "bg-[#DEEBCC] text-[#000] font-normal drop-shadow-none"
                    : "btn-hover font-extrabold text-white bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
                )}
              >
                <p>
                  {boxLevel === BoxSettings.max_box_level
                    ? "Highest level unlocked!"
                    : "Upgrade your box"}
                </p>
                {boxLevel !== BoxSettings.max_box_level && (
                  <img
                    className="w-[80px] h-[60px] absolute -right-[16px] -top-[11px]"
                    src="images/box/free.png"
                    alt=""
                  ></img>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBox;
