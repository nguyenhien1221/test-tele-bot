import clsx from "clsx";
import { useScreenSize } from "../../../Hooks/useScreenSize";
import { useNavigate } from "react-router-dom";
import { navPaths } from "../../../constants/navbar.constants";
import { useEffect, useRef, useState } from "react";
import {
  ClickAwayListener,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import UpgradeBoxItem from "../Components/UpgradeBoxItem";
import { useBoxSettings } from "../../../store/boxSettingsStore";
import useGetAcountReferees from "../../Friends/Hooks/useGetAcountReferees";
import useUpgradeBox from "../Hooks/useUpgradeBox";
import UpgradeBoxSucces from "../Components/UpgradeBoxSucces";
import useGetBoxSettings from "../Hooks/useGetBoxSetting";
import useGetBoxUpgrade from "../Hooks/useGetBoxUpgrade";
import useGetMyBox from "../Hooks/useGetMyBox";
import Loading from "../../../components/common/Loading";

const UpgradeBox = () => {
  const tele = window.Telegram.WebApp;
  const navigate = useNavigate();
  const { height } = useScreenSize();
  const BoxSettings = useBoxSettings((state: any) => state.myBoxSettings);

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const AcountReferees = useGetAcountReferees();
  const upgradeBox = useUpgradeBox();
  const BoxSettingsData = useGetBoxSettings();
  const BoxUpgradeInfo = useGetBoxUpgrade();
  const MyBox = useGetMyBox();

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isOpenUpradeSucces, setIsOpenUpradeSucces] = useState({
    isOpen: false,
    data: 1,
  });
  const [isRechecking, setIsRechecking] = useState<boolean>(false);

  const CLAIM_BOX_DAY = Number(
    new Date(MyBox.data?.data?.data?.timestamp).getTime()
  );

  const isSmallScreen = height <= 590;
  const boxLevel =
    MyBox.data?.data?.data?.level + MyBox.data?.data?.data?.upgrades?.length;
  const requiredRefers = BoxSettings.upgrade_refer_requirements[boxLevel + 1];

  const totalReferedForPreviousLevels =
    MyBox.data?.data?.data?.upgrades?.reduce((total: any, item: any) => {
      return (total += BoxSettings.upgrade_refer_requirements[item.level]);
    }, 0);

  const totalReferedForNextLevel =
    AcountReferees.data?.data?.data?.filter(
      (referer: any) => new Date(referer?.created_at).getTime() >= CLAIM_BOX_DAY
    )?.length - totalReferedForPreviousLevels;

  const progressRef = useRef<any>();

  useEffect(() => {
    const percentage = Math.ceil(
      (totalReferedForNextLevel / requiredRefers) * 100
    );
    progressRef.current.style.width = percentage + "%";
  }, [requiredRefers, totalReferedForNextLevel]);

  const handleBackBtn = () => {
    navigate(navPaths.MYSTERY_BOX);
  };

  const renderGuideContent = () => {
    return (
      <div className="text-xs">
        Requirement to level up the box:
        <br />1 &rarr; 2: invite {BoxSettings.upgrade_refer_requirements[2]}
        {` `}
        more friends
        <br />2 &rarr; 3: invite {BoxSettings.upgrade_refer_requirements[3]}
        {` `}
        more friends
        <br />3 &rarr; 4: invite {BoxSettings.upgrade_refer_requirements[4]}
        {` `}
        more friends
        <br />4 &rarr; 5: invite {BoxSettings.upgrade_refer_requirements[5]}
        {` `}
        more friends
        <br />5 &rarr; 6: invite {BoxSettings.upgrade_refer_requirements[6]}
        {` `}
        more friends {`(limit 550 times, fcfs)`}
        <br />6 &rarr; 7: invite {BoxSettings.upgrade_refer_requirements[7]}
        {` `}
        more friends {`(limit 50 times, fcfs)`}
      </div>
    );
  };

  const handleRecheckBox = async () => {
    setIsRechecking(true);
    await new Promise((r) => setTimeout(r, 2000));
    upgradeBox
      .mutateAsync()
      .then((data) => {
        setIsRechecking(false);
        setIsOpenUpradeSucces({ isOpen: true, data: data?.data?.data?.level });
        BoxSettingsData.refetch();
        AcountReferees.refetch();
        MyBox.refetch();
        BoxUpgradeInfo.refetch();
      })
      .catch(() => {
        setIsRechecking(false);
        BoxSettingsData.refetch();
        AcountReferees.refetch();
        MyBox.refetch();
        BoxUpgradeInfo.refetch();
      });
  };

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <ClickAwayListener
      onClickAway={() => {
        setIsTooltipOpen(false);
      }}
    >
      <Tooltip {...props} classes={{ popper: className }} />
    </ClickAwayListener>
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 398,
      padding: 10,
    },
  });

  return (
    <>
      <div
        className={clsx(
          "pt-[42px] px-4 pb-[150px] bg-[#F2FFE0] dark:bg-transparent h-screen relative z-30",
          "flex flex-col flex-1 justify-center"
        )}
      >
        {MyBox.isPending || BoxUpgradeInfo.isPending ? (
          <Loading />
        ) : (
          <>
            <UpgradeBoxItem level={boxLevel + 1} />
            <div className="flex justify-center text-sm">
              {BoxUpgradeInfo.data &&
                !!BoxUpgradeInfo.data?.data?.data[boxLevel + 1] && (
                  <div>
                    <p>{`(${BoxUpgradeInfo.data?.data?.data[boxLevel + 1]} ${
                      BoxUpgradeInfo.data?.data?.data[boxLevel + 1] <= 1
                        ? "Box"
                        : "Boxes"
                    })`}</p>
                  </div>
                )}
            </div>

            <div className="flex justify-center">
              <img
                className={clsx(
                  isSmallScreen ? "my-2" : "my-6",
                  "block dark:hidden w-[21px] h-7"
                )}
                src="/images/icons/uparrow.svg"
                alt="arrow"
              ></img>
              <img
                className={clsx(
                  isSmallScreen ? "my-2" : "my-6",
                  "dark:block hidden w-[21px] h-7"
                )}
                src="/images/icons/whiteuparrow.svg"
                alt="arrow"
              ></img>
            </div>
            <UpgradeBoxItem level={boxLevel} />
          </>
        )}
        <div className="absolute bottom-[30px] right-4 left-4">
          <div className="mb-[10px]">
            <div className="flex items-center justify-between mb-[6px]">
              <div className="flex  items-center gap-1 box-tooltip">
                <p className="font-medium dark:text-[#fff] text-[#384426]">
                  Friends
                </p>
                <CustomWidthTooltip
                  placement="top-start"
                  PopperProps={{
                    disablePortal: true,
                  }}
                  arrow
                  onClose={() => {
                    setIsTooltipOpen(false);
                  }}
                  open={isTooltipOpen}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={renderGuideContent()}
                  className="text-sm"
                >
                  <button
                    onClick={() => {
                      setIsTooltipOpen(!isTooltipOpen);
                    }}
                  >
                    <img
                      className="w-[18px] h-[18px]"
                      src="/images/leaderboard/info.png"
                      alt=""
                    ></img>
                  </button>
                </CustomWidthTooltip>
              </div>
              <div>
                <button
                  onClick={() => {
                    !upgradeBox.isPending && handleRecheckBox();
                  }}
                  className={clsx(
                    "w-full h-full rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                  )}
                >
                  {totalReferedForNextLevel >= requiredRefers ? (
                    <>
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.6875 8.21875C2.3125 8.625 1.65625 8.625 1.28125 8.21875C0.875 7.84375 0.875 7.1875 1.28125 6.8125L7.28125 0.8125C7.65625 0.40625 8.3125 0.40625 8.6875 0.8125L14.6875 6.8125C15.0938 7.1875 15.0938 7.84375 14.6875 8.21875C14.5 8.40625 14.25 8.5 14 8.5C13.7188 8.5 13.4688 8.40625 13.2812 8.21875L8 2.9375L2.6875 8.21875ZM8.6875 6.8125L14.6875 12.8125C15.0938 13.1875 15.0938 13.8438 14.6875 14.2188C14.5 14.4062 14.25 14.5 14 14.5C13.7188 14.5 13.4688 14.4062 13.2812 14.2188L8 8.9375L2.6875 14.2188C2.3125 14.625 1.65625 14.625 1.28125 14.2188C0.875 13.8438 0.875 13.1875 1.28125 12.8125L7.28125 6.8125C7.65625 6.40625 8.3125 6.40625 8.6875 6.8125Z"
                          fill="#64A905"
                        />
                      </svg>
                      <p className="text-[#62A802] font-medium">Upgrade</p>
                    </>
                  ) : (
                    <>
                      <div
                        className={clsx(
                          (isRechecking || upgradeBox.isPending) &&
                            "rotateVoting"
                        )}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.51172 8.97266C4.25391 9.70312 3.4375 10.0898 2.75 9.83203C2.01953 9.57422 1.63281 8.80078 1.89062 8.07031C2.36328 6.73828 3.13672 5.49219 4.16797 4.46094C7.94922 0.722656 14.0078 0.722656 17.7891 4.46094L18.5195 5.23438V3C18.5195 2.26953 19.1641 1.625 19.8945 1.625C20.668 1.625 21.2695 2.26953 21.2695 3V8.5C21.2695 9.27344 20.668 9.875 19.8945 9.875H14.4375C13.6641 9.875 13.0625 9.27344 13.0625 8.5C13.0625 7.76953 13.6641 7.125 14.4375 7.125H16.5859L15.8555 6.39453C13.1484 3.73047 8.80859 3.73047 6.10156 6.39453C5.37109 7.16797 4.8125 8.02734 4.51172 8.97266ZM1.67578 12.7109C1.71875 12.668 1.80469 12.668 1.84766 12.668C1.93359 12.668 1.97656 12.625 2.0625 12.625H7.5625C8.29297 12.625 8.9375 13.2695 8.9375 14C8.9375 14.7734 8.29297 15.375 7.5625 15.375H5.37109L6.10156 16.1484C8.80859 18.8125 13.1484 18.8125 15.8555 16.1484C16.5859 15.375 17.1445 14.5156 17.4453 13.5703C17.7031 12.8398 18.5195 12.4531 19.207 12.7109C19.9375 12.9688 20.3242 13.7422 20.0664 14.4727C19.5938 15.8047 18.8203 17.0078 17.7891 18.082C14.0078 21.8203 7.94922 21.8203 4.16797 18.082L3.4375 17.3086V19.5C3.4375 20.2734 2.79297 20.875 2.0625 20.875C1.28906 20.875 0.6875 20.2734 0.6875 19.5V14.043C0.6875 13.957 0.6875 13.8711 0.6875 13.8281C0.6875 13.7422 0.6875 13.6992 0.730469 13.6562C0.773438 13.4414 0.902344 13.2266 1.07422 13.0547C1.24609 12.8828 1.46094 12.7539 1.67578 12.7109Z"
                            fill="#62A802"
                          />
                        </svg>
                      </div>
                      <p className="text-[#62A802] font-medium">Recheck</p>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="w-full h-[18px] bg-[#DEEBCC] rounded-xl relative overflow-hidden">
              {AcountReferees.data && MyBox.data && (
                <p className="absolute -translate-x-[50%] left-[50%] z-10 text-xs text-[#384426]">
                  {`${totalReferedForNextLevel}/${requiredRefers}`}
                </p>
              )}
              <div
                ref={progressRef}
                className={clsx("absolute bg-[#BBDA8F] top-0 h-[18px]")}
              ></div>
            </div>
          </div>
          <div>
            <div className="col-span-4">
              <button
                onClick={() => {
                  navigate(navPaths.FRIENDS, {
                    state: { fromUpgradeBox: true },
                  });
                }}
                className={clsx(
                  "font-extrabold text-white py-[18px] w-full rounded-xl flex items-center justify-center gap-2",
                  "btn-hover bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
                )}
              >
                Invite more friends
                <img
                  className="w-5 h-[22px]"
                  src="images/icons/invite.svg"
                  alt=""
                ></img>
              </button>
            </div>
          </div>
        </div>
        {isOpenUpradeSucces.isOpen && (
          <UpgradeBoxSucces
            handleClose={() => {
              setIsOpenUpradeSucces({ isOpen: false, data: 1 });
              if (boxLevel === BoxSettings.max_box_level) {
                navigate(navPaths.MYSTERY_BOX);
              }
            }}
            level={isOpenUpradeSucces?.data}
          />
        )}
      </div>
    </>
  );
};

export default UpgradeBox;
