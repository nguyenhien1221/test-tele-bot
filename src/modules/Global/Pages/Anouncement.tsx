// import { Button } from "@mui/material";
import Overload from "../Components/Overload";
import Maintainance from "../Components/Maintainance";

const Anouncement = () => {
  const tele = window.Telegram.WebApp;
  const isOverLoad = false;

  // const handleReload = () => {
  //   window.location.reload();
  // };

  return (
    <div className="bg-[#F2FFE0] h-screen  px-4 py-[120px]">
      <div className="flex flex-col h-full">
        <div
          className="flex-1 h-28 max-h-[223px] bg-no-repeat bg-contain bg-center"
          style={{
            backgroundImage: `url("/images/${
              isOverLoad ? "overload" : "maintain"
            }.png")`,
          }}
        ></div>
        {isOverLoad ? <Overload /> : <Maintainance />}
        <div className="pt-10">
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-sm">Follow us</p>
            <div className="flex gap-4 mt-2">
              <div
                onClick={() =>
                  tele.openTelegramLink("https://t.me/seedupdates")
                }
              >
                <img
                  src="/images/icons/telegram.png"
                  alt=""
                  className="w-[32px] h-[32px]"
                ></img>
              </div>
              <div
                onClick={() =>
                  tele.openLink("https://twitter.com/SeedCombinator")
                }
              >
                <img
                  src="/images/icons/twitter.png"
                  alt=""
                  className="w-[32px] h-[32px]"
                ></img>
              </div>
            </div>
          </div>
          {/* <Button
            onClick={handleReload}
            className="btn-hover fixed bottom-[55px] text-[20px] left-4 right-4 capitalize font-extrabold text-white py-[16px] rounded-xl bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
          >
            Reload
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Anouncement;