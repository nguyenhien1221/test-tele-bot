import { useState } from "react";
import { missionsOptions } from "../../../constants/missions.constants";
import MissionsModal from "../Components/MissionsModal";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import useGetMissions from "../Hooks/useGetMissions";
import { formatDecimals } from "../../../utils/formatNumber";
import { getMissionsByType, getToltalReward } from "../Utils/missions";
import useDoMissions from "../Hooks/useDoMissions";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../components/common/Loading";
import { copyToClipboard } from "../../../utils/helper";

const MissionsPage = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;
  const userID = tele.initDataUnsafe?.user?.id;

  const missionsData = useGetMissions();
  const doMission = useDoMissions();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const [isOpen, setisOpen] = useState({ isOpen: false, type: 0 });

  const isDesktop = window.innerHeight < 610 ? true : false;

  const handleChooseMission = (index: number) => {
    const data = missionsData.data?.data.data;
    if (index === 2) {
      copyToClipboard(
        `${process.env.REACT_APP_BOT_URL}startapp=${String(userID)}`
      );
      if (!data[data.length - 1]?.task_user?.completed) {
        handleDoMission(data[data.length - 1]?.id);
      }
      return;
    }
    setisOpen({ isOpen: true, type: index });
  };

  const handleBackBtn = () => {
    navigate("/");
    setisOpen({ isOpen: false, type: 0 });
  };

  const handleDoMission = (id: string) => {
    doMission
      .mutateAsync(id)
      .then(() => {
        toast.success("Mission completed", {
          style: { width: 272, borderRadius: 8 },
          autoClose: 2000,
        });
        missionsData.refetch();
      })
      .catch(() => {
        toast.error("mission is not completed", {
          style: { width: 272, borderRadius: 8 },
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      {missionsData.isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-auto pt-[42px] px-4 relative h-screen bg-[#F2FFE0] dark:bg-transparent">
          <ToastContainer
            limit={1}
            stacked
            className="top-3 w-[272px] left-[50%] -translate-x-[50%]"
          />
          {/* boot info */}
          <div className="flex flex-col items-center dark:text-white">
            <div className="flex flex-col items-center gap-3">
              <img
                src="/images/icons/token_icon.png"
                width={100}
                height={100}
                alt="token"
              ></img>
              <p className="text-[24px] font-extrabold">{`${missionsOptions.length} missions available`}</p>
            </div>
            <p className="text-sm font-normal">
              Complete the mission to get golden seed
            </p>
          </div>

          {/* options */}
          <div className={clsx(isDesktop ? "mt-2" : "mt-[49px]")}>
            {missionsOptions.map((item, index) => {
              const isDone = getMissionsByType(
                index,
                missionsData.data?.data.data
              )?.some((item: any) => item.task_user === null);

              return (
                <div
                  onClick={() => handleChooseMission(index)}
                  key={index}
                  className={clsx(
                    "z-10 relative cursor-pointer grid grid-cols-10 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] drop-shadow-lg",
                    "dark:gradient-border-mask-mission dark:bg-transparent"
                  )}
                >
                  <div className="col-span-2 flex items-center">
                    <div>
                      <img
                        src={item.icon}
                        width={48}
                        height={48}
                        alt="storage"
                      ></img>
                    </div>
                  </div>
                  <div className="col-span-7 dark:text-white">
                    <p className="text-[13px] font-normal mb-2 dark:text-white text-[#7D7D7D]">
                      {item.title}
                    </p>
                    <div className="flex gap-[7px] mb-2">
                      <p className="font-normal">{item.description}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <img
                          src="/images/icons/token_icon.png"
                          width={14}
                          height={14}
                          alt="token"
                        ></img>
                        <p className="text-xs font-extrabold">{`${formatDecimals(
                          getToltalReward(index, missionsData.data?.data.data)
                        )} SEED`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center">
                    {!isDone && (
                      <img
                        src="/images/icons/Check.svg"
                        alt="check"
                        width={22}
                        height={22}
                      ></img>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {isOpen.isOpen && (
            <MissionsModal
              handleDoMission={(id: string) => handleDoMission(id)}
              data={missionsData.data?.data.data ?? []}
              type={isOpen.type}
              closeModal={() => setisOpen({ isOpen: false, type: 0 })}
              isOpen={isOpen.isOpen}
            ></MissionsModal>
          )}
        </div>
      )}
    </>
  );
};

export default MissionsPage;
