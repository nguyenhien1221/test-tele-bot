import clsx from "clsx";
import { useState } from "react";
import ItemLoading from "../../../components/common/ItemLoading";
import { formatDecimals } from "../../../utils/formatNumber";
import useDoMissions from "../Hooks/useDoMissions";
import { toast } from "react-toastify";

import { api } from "../../../config/api";
import { renderErrMessage } from "../../../utils/helper";

interface TeleMissionItemType {
  item: any;
  reFetch: () => void;
}

const TeleMissionItem = ({ item, reFetch }: TeleMissionItemType) => {
  const tele = window.Telegram.WebApp;
  const doMission = useDoMissions();

  const [loading, setLoading] = useState<boolean>(false);

  const handleOpenLink = () => {
    if (item?.task_user === null || !item?.task_user?.completed) {
      tele.openTelegramLink(item?.metadata?.url ?? "");
      doMission
        .mutateAsync(item?.id)
        .then(async (data) => {
          setLoading(true);
          for (let i = 0; i <= 10; i++) {
            let res = null;
            try {
              res = await api.get(
                `/api/v1/tasks/notification/${data?.data?.data}`
              );
            } catch (err) {
              console.debug(err);
            }

            if (res?.data?.data != null) {
              if (!!res?.data?.data?.data?.completed) {
                toast.success("Mission completed", {
                  style: { maxWidth: 337, height: 40, borderRadius: 8 },
                  autoClose: 2000,
                });
                setLoading(false);
                reFetch();
                return;
              }

              toast.error(renderErrMessage(res?.data?.data?.error), {
                style: { maxWidth: 337, height: 40, borderRadius: 8 },
                autoClose: 2000,
              });
              setLoading(false);
              return;
            }

            if (i === 10) {
              toast.error("Verify mission timed out", {
                style: { maxWidth: 337, height: 40, borderRadius: 8 },
                autoClose: 2000,
              });
              setLoading(false);
              return;
            }

            await new Promise((r) => setTimeout(r, 1000));
          }
        })
        .catch(() => {
          setLoading(false);
        });
      return;
    }
    tele.openTelegramLink(item?.metadata?.url ?? "");
  };
  return (
    <>
      <button
        disabled={loading}
        onClick={() => {
          handleOpenLink();
        }}
        key={item?.id}
        rel="noreferrer"
        className={clsx("text-center relative w-full mt-1 ")}
      >
        {item.task_user != null &&
          (item.task_user.repeats || 0 >= item.repeats) && (
            <div
              className={clsx(
                "w-[30px] h-[30px] rounded-[50%] flex items-center justify-center absolute right-4 -top-4 z-20"
              )}
            >
              <img
                src="/images/holy/check_mark.png"
                className="w-[31px] h-[31px]"
                alt=""
              ></img>
            </div>
          )}
        <div
          key={item.id}
          className={clsx(
            "z-10 py-3 px-4 relative cursor-pointer grid grid-cols-12 gap-3 bg-white rounded-2xl p-4 w-full mb-[18px] ",
            "dark:gradient-border-mask-mission dark:bg-transparent",
            "dark:drop-shadow-none ",
            item.task_user?.repeats || 0 >= item.repeats
              ? "border-[1px] border-solid border-[#000] drop-shadow-none brightness-50"
              : "border-[1px] border-[#97C35B] border-solid drop-shadow-[0_4px_0px_#4D7F0C] btn-hover dark:btn-click"
          )}
        >
          <div className="col-span-9 flex">
            <div className=" flex items-center mr-4">
              <div className="rounded-lg drop-shadow-lg overflow-hidden w-8 h-8">
                <img
                  src={item.metadata.image_url}
                  className="w-8 h-8"
                  alt=""
                ></img>
              </div>
            </div>

            <div className=" flex items-center text-start justify-start text-[15px]">
              {item.name}
            </div>
          </div>
          <div className="col-span-3 flex items-center justify-start">
            {doMission.isPending || loading ? (
              <ItemLoading />
            ) : (
              <>
                <img
                  src="/images/icons/token_icon.png?v=3"
                  className="w-4 h-4"
                  alt=""
                ></img>
                <span className="font-semibold text-sm ml-1">{`+${formatDecimals(
                  item.reward_amount ?? 0
                )}`}</span>
              </>
            )}
          </div>
        </div>
      </button>
    </>
  );
};

export default TeleMissionItem;
