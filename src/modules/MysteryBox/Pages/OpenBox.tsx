import clsx from "clsx";
import { useScreenSize } from "../../../Hooks/useScreenSize";
import useGetMyBox from "../Hooks/useGetMyBox";
import Loading from "../../../components/common/Loading";
import { useNavigate } from "react-router-dom";

const OpenBox = () => {
  const tele = window.Telegram.WebApp;
  const navigate = useNavigate();
  const { height } = useScreenSize();
  const MyBox = useGetMyBox();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const handleBackBtn = () => {
    navigate("/");
  };
  return (
    <>
      {MyBox.isPending ? (
        <Loading />
      ) : (
        <div
          className={clsx(
            " px-4 pb-[100px] open-box-page-bg h-screen relative z-30",
            "flex justify-center flex-1 item",
            height > 590 ? "pt-[100px]" : "pt-[80px]"
          )}
        >
          <div
            className={clsx(
              "flex flex-1 max-h-[450px] relative justify-center",
              height > 590 ? "items-center" : "items-start"
            )}
          >
            <img
              className={clsx(
                height > 590 ? "w-[550px] h-[498px]" : "w-[420px] h-[270px]"
              )}
              src={"/images/box/open_box_flare.png?v=3"}
              alt=""
            ></img>
            <img
              className={clsx(
                "shaking-box absolute",
                height > 590 ? "w-[216px] h-[277px]" : "w-[156px] h-[200px]"
              )}
              src={`/images/egg/${1}.png?v=3`}
              alt=""
            ></img>
          </div>
          <div className="absolute bottom-[30px] right-4 left-4 flex flex-col items-center justify-center">
            <div className="text-center mb-[27px]">
              <p className="font-spicy-rice-regular mb-1 text-[30px] text-white drop-shadow-[0_2px_2px_#00000073]">
                Congrats!
              </p>
              <p className=" text-white font-medium text-lg drop-shadow-[0_2px_2px_#00000073]">
                You've obtained a common egg!
              </p>
            </div>
            <button
              className={clsx(
                "py-[18px] normal-case w-full rounded-xl flex items-center justify-center gap-2",
                "btn-hover font-extrabold text-[#4C7E0B] drop-shadow-[0_4px_0px_#4C7E0B]",
                "bg-white border-2 border-[#88BC44]"
              )}
            >
              <p>Claim</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenBox;
