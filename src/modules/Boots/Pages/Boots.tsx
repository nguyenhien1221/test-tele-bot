import { useState } from "react";
import { bootOptions } from "../../../constants/boots.constants";
import MissionsModal from "../Components/MissionsModal";

const Boots = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);

  return (
    <div className="pt-[42px] px-4 bg-gradient-to-b relative h-screen from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
      {/* boot info */}
      <div className="flex flex-col items-center">
        <p className="text-sm font-normal">Your balance</p>
        <div className="flex items-center gap-2">
          <img
            src="/images/icons/token_icon.svg"
            width={44}
            height={44}
            alt="token"
          ></img>
          <p className="text-[40px] font-bold">0.00001</p>
        </div>
        <div className="flex gap-2 items-center text-sm">
          <p className=" font-normal">Storage size:</p>
          <div className="flex items-center gap-1">
            <img
              src="/images/icons/token_icon.svg"
              width={17}
              height={17}
              alt="token"
            ></img>
            <p className="font-bold">0.00001</p>
            <p>SEED</p>
          </div>
        </div>
        <div className="flex gap-2 items-center text-sm mt-3">
          <p className=" font-normal">Mining speed:</p>
          <div className="flex items-center gap-1">
            <img
              src="/images/icons/token_icon.svg"
              width={17}
              height={17}
              alt="token"
            ></img>
            <p className="font-bold">0.00001</p>
            <p>SEED/hour</p>
          </div>
        </div>
      </div>

      {/* options */}
      <div className="mt-[49px]">
        {bootOptions.map((item, index) => (
          <div
            onClick={() => setisOpen(true)}
            key={index}
            className="grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] drop-shadow-lg"
          >
            <div className="col-span-2 flex ">
              <img src={item.icon} width={62} alt="storage"></img>
            </div>
            <div className="col-span-5">
              <p className="font-bold mb-2">{item.title}</p>
              <div className="flex gap-[7px] mb-2">
                <p className="text-sm font-normal">{item.description}</p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <img
                    src="/images/icons/token_icon.svg"
                    width={14}
                    height={14}
                    alt="token"
                  ></img>
                  <p className="text-xs font-normal">0.2 SEED . Lv1</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <MissionsModal closeModal={() => setisOpen(false)} isOpen={true} />
      )}
    </div>
  );
};

export default Boots;
