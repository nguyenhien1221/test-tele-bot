import { Button } from "@mui/material";
import NavBar from "../../components/common/NavBar";

const Home = () => {
  const tele = window.Telegram.WebApp;
  const handlePopup = () => {
    tele.showPopup();
  };
  return (
    <div className="pt-[42px] relative">
      <div className="flex flex-col items-center">
        <p className="text-sm font-normal">In Storage:</p>
        <div className="flex items-center gap-2">
          <img
            src="/images/icons/token_icon.svg"
            width={44}
            height={44}
            alt="token"
          ></img>
          <p className="text-[40px] font-bold">0.00001</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-normal">SEED Balance:</p>
          <div className="flex items-center gap-1">
            <img
              src="/images/icons/token_icon.svg"
              width={17}
              height={17}
              alt="token"
            ></img>
            <p className="text-sm font-bold">0.00001</p>
          </div>
        </div>
        <div className=" top-[100px]">
          <img src="/images/icons/treelv6.svg" width={326} alt=""></img>
        </div>
      </div>
      {/* storage button */}
      <div className="">
        <div className="grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full">
          <div className="col-span-2">
            <img src="/images/icons/storage.svg" width={62} alt="storage"></img>
          </div>
          <div className="col-span-3">
            <p className="font-bold">Storage</p>
            <div className="flex gap-[7px]">
              <img src="/images/icons/clock.svg" width={14} alt="clock"></img>
              <p className="text-xs">3h 36m to fill</p>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <img
                  src="/images/icons/token_icon.svg"
                  width={14}
                  height={14}
                  alt="token"
                ></img>
                <p className="text-xs font-normal">0.001 SEED/hour</p>
              </div>
            </div>
          </div>
          <div className="flex items-center col-span-2 ">
            <Button
              onClick={() => handlePopup()}
              className="w-full h-40px rounded-lg bg-gradient-to-r from-[#F9D52A] to-[#F54979] text-[#fff] text-sm font-bold"
            >
              Claim
            </Button>
          </div>
        </div>
      </div>

      <div className=" mt-3">
        <NavBar />
      </div>
    </div>
  );
};

export default Home;
