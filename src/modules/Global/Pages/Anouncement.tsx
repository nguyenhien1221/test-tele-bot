import { Button } from "@mui/material";

const Anouncement = () => {
  console.debug("cache prune - 2");
  const tele = window.Telegram.WebApp;
  return (
    <div className="bg-[#F2FFE0] h-screen  px-4 py-[60px]">
      <div className="flex flex-col h-full">
        <div
          className="flex-1 h-28 max-h-[223px] bg-no-repeat bg-contain bg-center"
          style={{
            backgroundImage: `url("/images/maintain.png?v=3")`,
          }}
        ></div>
        <div className="flex flex-col items-center pb-2 pt-10">
          <div className="text-center mt-6 h-[120px]">
            <p className="text-[32px] font-extrabold">Maintenance</p>
            <p>
              Oops! Too many people accessing. <br /> We're pausing briefly to
              ensure the app <br />
              runs smoothly
            </p>
          </div>
        </div>
        <div className="pt-10">
          <Button
            onClick={() => {
              tele.openTelegramLink("https://t.me/seedupdates");
            }}
            className="btn-hover normal-case fixed bottom-[55px] left-4 right-4 font-extrabold text-white py-[16px] rounded-xl bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
          >
            Join Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Anouncement;
