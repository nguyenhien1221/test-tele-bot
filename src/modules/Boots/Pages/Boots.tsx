import { useState } from "react";
import {
  boostSpeedLevel,
  bootOptions,
  bootTypeEnum,
  bootsStorageLevel,
} from "../../../constants/boots.constants";
import { Slide, ToastContainer, toast } from "react-toastify";
import BootsModal from "../Components/BootsModal";
import { useNavigate } from "react-router-dom";
import useUpgradeStorage from "../Hooks/useUpgradeStoarage";
import useUpgradeSpeed from "../Hooks/useUpgradeSpeed";
import clsx from "clsx";
import useGetAcountBalance from "../../Home/Hooks/useGetAcountBalance";
import {
  formatDecimals,
  formatNumberFloatFix,
} from "../../../utils/formatNumber";
import useGetAcountDetails from "../../../components/Hooks/useRegister";
import {
  getSpeedUpgradesLevel,
  getStorageUpgradesLevel,
  getWaterUpgradesLevel,
} from "../../../utils/minedSeed";
import HolyWaterModal from "../Components/HolyWaterModal";
import useGetWaterMissions from "../Hooks/useGetHolyTask";
import useDoWaterMissions from "../Hooks/useDoWaterMission";
import WaterMissionsModal from "../Components/WaterMissionModal";
import useUpgradeWater from "../Hooks/useUpgradeHolyWater";
import { navPaths } from "../../../constants/navbar.constants";
import useGetMissionsStatus from "../../Missions/Hooks/useGetMissionStatus";

const Boots = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;

  const UpgradeStorage = useUpgradeStorage();
  const UpgradeSpeed = useUpgradeSpeed();
  const AcountBalance = useGetAcountBalance();
  const AcountData = useGetAcountDetails();
  const WaterMission = useGetWaterMissions();
  const DoWaterMission = useDoWaterMissions();
  const UpgradeWater = useUpgradeWater();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const [isOpen, setisOpen] = useState<any>({ isOpen: false, type: 0 });
  const [isOpenWater, setIsOpenWater] = useState<boolean>(false);
  const [isWaterMissionOpen, setIsWaterMissionOpen] = useState(false);
  const [missionId, setMissionId] = useState("");

  const isDesktop = window.innerHeight < 610 ? true : false;
  const GetMissionStatus = useGetMissionsStatus(String(missionId));
  const handleUpgrade = () => {
    if (isOpen.type === bootTypeEnum.STORAGE) {
      UpgradeStorage.mutateAsync()
        .then(() => {
          AcountData.refetch();
          AcountBalance.refetch();
          toast.success("Upgraded Successfully", {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
          setisOpen({ isOpen: false, type: 0 });
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
          // setisOpen({ isOpen: false, type: 0 });
        });

      return;
    }
    if (isOpen.type === bootTypeEnum.SPEED) {
      UpgradeSpeed.mutateAsync()
        .then(() => {
          AcountData.refetch();
          AcountBalance.refetch();
          toast.success("Upgraded Successfully", {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
          setisOpen({ isOpen: false, type: 0 });
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
          // setisOpen({ isOpen: false, type: 0 });
        });
    }
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  const handleOpenModal = (type: number) => {
    if (type === bootTypeEnum.WATER) {
      setIsOpenWater(true);
      return;
    }

    if (
      type === bootTypeEnum.STORAGE &&
      getStorageUpgradesLevel(AcountData.data?.data.data) + 1 < 6
    ) {
      setisOpen({ isOpen: true, type: type });
      return;
    }

    if (
      type === bootTypeEnum.SPEED &&
      getSpeedUpgradesLevel(AcountData.data?.data.data) + 1 < 6
    ) {
      setisOpen({ isOpen: true, type: type });
      return;
    }

    toast.error("You have reached the maximum level", {
      style: { maxWidth: 337, height: 40, borderRadius: 8 },
      autoClose: 2000,
    });
  };

  const handleDoWaterMision = (item: any) => {
    if (item.type === "like and retweet") {
      tele.openLink(item.metadata.url);
      DoWaterMission.mutateAsync(item.id)
        .then(() => {
          toast.success("Mission completed", {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
          WaterMission.refetch();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
        });

      return;
    }
    if (item.type === "check-in") {
      DoWaterMission.mutateAsync(item.id)
        .then((data) => {
          const missisonId = data?.data?.data;
          setMissionId(missisonId);
        })
        .then(() => {
          if (GetMissionStatus.data?.data?.data?.repeats >= item.repeats) {
            toast.success("Mission completed", {
              style: { maxWidth: 337, height: 40, borderRadius: 8 },
              autoClose: 2000,
            });
          } else {
            toast.error(GetMissionStatus.data?.data?.data?.error, {
              style: { maxWidth: 337, height: 40, borderRadius: 8 },
              autoClose: 2000,
            });
          }
          WaterMission.refetch();
        })
        .catch((err) => {
          if (err.response?.data?.message === "incomplete task") {
            navigate(navPaths.MISSIONS, { state: { isOpenDailyModal: true } });
          }
        });
    }
    if (item.type === "refer") {
      DoWaterMission.mutateAsync(item.id)
        .then((data) => {
          const missisonId = data?.data?.data;
          setMissionId(missisonId);
        })
        .then(() => {
          if (GetMissionStatus.data?.data?.data?.repeats >= item.repeats) {
            toast.success("Mission completed", {
              style: { maxWidth: 337, height: 40, borderRadius: 8 },
              autoClose: 2000,
            });
          } else {
            toast.error(GetMissionStatus.data?.data?.data?.error, {
              style: { maxWidth: 337, height: 40, borderRadius: 8 },
              autoClose: 2000,
            });
          }
          WaterMission.refetch();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, {
            style: { maxWidth: 337, height: 40, borderRadius: 8 },
            autoClose: 2000,
          });
        });
    }
  };

  const handleOpenWaterMissionModal = () => {
    setIsWaterMissionOpen(true);
  };

  const handleUpgradeWater = () => {
    UpgradeWater.mutateAsync()
      .then(() => {
        AcountData.refetch();
        AcountBalance.refetch();
        toast.success("Upgraded Successfully", {
          style: { maxWidth: 337, height: 40, borderRadius: 8 },
          autoClose: 2000,
        });
        setisOpen({ isOpen: false, type: 0 });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          style: { maxWidth: 337, height: 40, borderRadius: 8 },
          autoClose: 2000,
        });
        // setisOpen({ isOpen: false, type: 0 });
      });
  };

  return (
    <div
      className={clsx(
        "overflow-auto pt-[42px] px-4  relative h-screen bg-[#F2FFE0]",
        "dark:bg-transparent"
      )}
    >
      <ToastContainer
        position="top-left"
        closeOnClick
        transition={Slide}
        hideProgressBar
        limit={1}
        stacked
        className="top-3 max-w-[337px] left-[50%] -translate-x-[50%]"
      />
      {/* boot info */}
      <div className="flex flex-col items-center dark:text-white">
        <p className="text-base font-normal">Your balance</p>
        <div className="flex items-center gap-2">
          <img
            src="/images/icons/token_icon.png"
            width={44}
            height={44}
            alt="token"
          ></img>
          <p className="text-[40px] font-extrabold">
            {formatNumberFloatFix(
              Number(formatDecimals(AcountBalance.data?.data.data)) ?? 0,
              6
            )}
          </p>
        </div>
      </div>
      {/* options */}
      <div className={clsx(isDesktop ? "mt-2" : "mt-[49px]")}>
        {AcountData.data?.data?.data &&
          bootOptions.map((item, index) => {
            let price = 0.2;
            let level = 0;
            let icon = "";
            const storagePrice =
              bootsStorageLevel[
                getStorageUpgradesLevel(AcountData.data?.data.data) + 1
              ]?.price;
            const speedPrice =
              boostSpeedLevel[
                getSpeedUpgradesLevel(AcountData.data?.data.data) + 1
              ]?.price;

            const storageMaxLevel = Object.keys(bootsStorageLevel).length;
            const speedMaxLevel = Object.keys(boostSpeedLevel).length;

            if (index === 0) {
              price = storagePrice;
              level = getStorageUpgradesLevel(AcountData.data?.data.data);
              icon = `/images/storage/${getStorageUpgradesLevel(AcountData.data?.data.data) + 1
                }.png`;
            } else if (index === 1) {
              price = speedPrice;
              level = getSpeedUpgradesLevel(AcountData.data?.data.data);
              icon = `/images/trees/${getSpeedUpgradesLevel(AcountData.data?.data.data) + 1
                }.png`;
            } else {
              price = 0.2;
              level = getWaterUpgradesLevel(AcountData.data?.data.data);
              icon = `/images/holy/${getWaterUpgradesLevel(AcountData.data?.data.data) + 1
                }.png`;
            }

            return (
              <div
                onClick={() => handleOpenModal(index)}
                key={index}
                className={clsx(
                  "btn-hover dark:btn-click z-10 relative cursor-pointer grid grid-cols-7 gap-0 bg-white rounded-2xl p-4 w-full mb-[18px] ",
                  "dark:gradient-border-mask-mission dark:bg-transparent dark:drop-shadow-none",
                  "border-[1px] border-[#4D7F0C] border-solid drop-shadow-[0_4px_0px_#4D7F0C]"
                )}
              >
                <div className="col-span-2 flex items-center ">
                  <div className="">
                    <img
                      className="object-contain w-[73px] h-[67px]"
                      src={icon}
                      width={73}
                      height={67}
                      alt="storage"
                    ></img>
                  </div>
                </div>
                <div className="col-span-5 dark:text-white">
                  <p className="font-semibold mb-1">{`${item.title} Level ${level + 1
                    }`}</p>
                  <div className=" mb-1">
                    <p className="text-sm font-normal">{item.description}</p>
                  </div>
                  <div>
                    {(level + 1 === storageMaxLevel ||
                      level + 1 === speedMaxLevel) &&
                    index !== bootTypeEnum.WATER ? (
                      <div className="text-xs font-normal">
                        Max Level Achieved
                      </div>
                    ) : (
                      <div className={clsx("flex items-center gap-1")}>
                        <img
                          className={clsx(index === 2 ? "w-[21px] h-5" : "")}
                          src={`/images/icons/${
                            index === 2 ? "holy" : "token_icon"
                          }.png`}
                          width={14}
                          height={14}
                          alt="token"
                        ></img>
                        <p className="text-xs font-normal">
                          {`
                      ${index === 2 ? "" : price} ${
                            index === 2 ? "Complete mission" : ""
                          } to upgrade
                      `}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {isOpen.isOpen && AcountData.data && (
        <BootsModal
          isLoading={UpgradeStorage.isPending || UpgradeSpeed.isPending}
          storageLevel={
            getStorageUpgradesLevel(AcountData.data?.data.data) ?? 0
          }
          speedLevel={getSpeedUpgradesLevel(AcountData.data?.data.data) ?? 0}
          type={isOpen.type}
          closeModal={() => setisOpen({ isOpen: false, type: 0 })}
          handleUpgrade={() => handleUpgrade()}
        />
      )}

      {isOpenWater && (
        <HolyWaterModal
          userData={WaterMission.data?.data.data ?? []}
          isLoading={UpgradeStorage.isPending || UpgradeSpeed.isPending}
          storageLevel={getWaterUpgradesLevel(AcountData.data?.data.data) ?? 0}
          speedLevel={getWaterUpgradesLevel(AcountData.data?.data.data) ?? 0}
          type={2}
          closeModal={() => setIsOpenWater(false)}
          handleUpgrade={() => handleUpgradeWater()}
          handleOpenMission={() => handleOpenWaterMissionModal()}
        />
      )}

      {isWaterMissionOpen && WaterMission.data && (
        <WaterMissionsModal
          reFetch={() => {
            WaterMission.refetch();
            AcountData.refetch();
            AcountBalance.refetch();
          }}
          isPending={DoWaterMission.isPending}
          data={WaterMission.data?.data.data ?? []}
          handleDoMission={(item: any) => handleDoWaterMision(item)}
          closeModal={() => {
            setIsWaterMissionOpen(false);
            setIsOpenWater(false);
          }}
          closeWaterMissionModal={() => {
            setIsWaterMissionOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Boots;
