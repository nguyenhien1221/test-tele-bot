import { useState } from "react";
import { bootOptions, bootTypeEnum } from "../../../constants/boots.constants";
import { ToastContainer, toast } from "react-toastify";
import BootsModal from "../Components/BootsModal";
import { useNavigate } from "react-router-dom";
import useUpgradeStorage from "../Hooks/useUpgradeStoarage";
import useUpgradeSpeed from "../Hooks/useUpgradeSpeed";
import clsx from "clsx";

const Boots = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;

  const UpgradeStorage = useUpgradeStorage();
  const UpgradeSpeed = useUpgradeSpeed();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const [isOpen, setisOpen] = useState<any>({ isOpen: false, type: 0 });

  const isDesktop = window.innerHeight < 610 ? true : false;

  const handleUpgrade = () => {
    if (isOpen.type === bootTypeEnum.STORAGE) {
      UpgradeStorage.mutateAsync()
        .then(() => {
          toast.success("Upgraded Successfully", {
            style: { width: 272, borderRadius: 8 },
          });
          setisOpen({ isOpen: false, type: 0 });
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            style: { width: 272, borderRadius: 8 },
          });
          setisOpen({ isOpen: false, type: 0 });
        });

      return;
    }
    if (isOpen.type === bootTypeEnum.SPEED) {
      UpgradeSpeed.mutateAsync()
        .then(() => {
          toast.success("Upgraded Successfully", {
            style: { width: 272, borderRadius: 8 },
          });
          setisOpen({ isOpen: false, type: 0 });
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            style: { width: 272, borderRadius: 8 },
          });
          setisOpen({ isOpen: false, type: 0 });
        });
    }
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  const handleOpenModal = (type: number) => {
    if (type === bootTypeEnum.WATER) {
      toast.info("Coming soon", {
        position: "top-center",
        style: { width: 272, borderRadius: 8 },
        progressStyle: {
          backgroundColor: "#FF8C21",
        },
        icon: <img src="/images/icons/clock.png" alt=""></img>,
      });
    } else {
      setisOpen({ isOpen: true, type: type });
    }
  };

  return (
    <div className="pt-[42px] px-4 bg-gradient-to-b relative h-screen from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
      <ToastContainer
        stacked
        className="top-3 w-[272px] left-[50%] -translate-x-[50%]"
      />

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
          <p className="text-[40px] font-extrabold">0.00001</p>
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
      <div className={clsx(isDesktop ? "mt-2" : "mt-[49px]")}>
        {bootOptions.map((item, index) => (
          <div
            onClick={() => handleOpenModal(index)}
            key={index}
            className="grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] drop-shadow-lg"
          >
            <div className="col-span-2 flex items-center ">
              <div className="w-[73px] h-[67px]">
                <img
                  className="object-contain"
                  src={item.icon}
                  width={73}
                  height={67}
                  alt="storage"
                ></img>
              </div>
            </div>
            <div className="col-span-5">
              <p className="font-bold mb-2">{item.title}</p>
              <div className=" mb-2">
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

      {isOpen.isOpen && (
        <BootsModal
          type={isOpen.type}
          closeModal={() => setisOpen({ isOpen: false, type: 0 })}
          handleUpgrade={() => handleUpgrade()}
        />
      )}
    </div>
  );
};

export default Boots;
