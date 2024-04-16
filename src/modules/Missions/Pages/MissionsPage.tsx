import { useState } from "react";
import { missionsOptions } from "../../../constants/missions.constants";
import MissionsModal from "../Components/MissionsModal";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const MissionsPage = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const [isOpen, setisOpen] = useState<boolean>(false);

  const isDesktop = window.innerHeight < 610 ? true : false;

  const handleChooseMission = (index: number) => {
    setisOpen(true);
    console.log(index);
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <div className="overflow-auto pt-[42px] px-4 bg-gradient-to-b relative h-screen from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
      {/* boot info */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/images/icons/token_icon.svg"
            width={100}
            height={100}
            alt="token"
          ></img>
          <p className="text-[24px] font-extrabold">3 missions available</p>
        </div>
        <p className="text-sm font-normal">
          Complete the mission to get golden seed
        </p>
      </div>

      {/* options */}
      <div className={clsx(isDesktop ? "mt-2" : "mt-[49px]")}>
        {missionsOptions.map((item, index) => (
          <div
            onClick={() => handleChooseMission(index)}
            key={index}
            className="grid grid-cols-10 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] drop-shadow-lg"
          >
            <div className="col-span-2 flex items-center">
              <div>
                <img src={item.icon} width={48} height={48} alt="storage"></img>
              </div>
            </div>
            <div className="col-span-7">
              <p className="text-[13px] font-normal mb-2 text-[#7D7D7D]">
                {item.title}
              </p>
              <div className="flex gap-[7px] mb-2">
                <p className="font-normal">{item.description}</p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <img
                    src="/images/icons/token_icon.svg"
                    width={14}
                    height={14}
                    alt="token"
                  ></img>
                  <p className="text-xs font-bold">{`${item.seed} SEED`}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex">
              <img
                src="/images/icons/check.svg"
                alt="check"
                width={22}
                height={22}
              ></img>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <MissionsModal
          closeModal={() => setisOpen(false)}
          isOpen={true}
        ></MissionsModal>
      )}
    </div>
  );
};

export default MissionsPage;
