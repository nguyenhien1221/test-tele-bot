import { Button } from "@mui/material";
import clsx from "clsx";
import { MODAL_TYPE, useVoting } from "../../../store/votingStore";
// import { toast } from "react-toastify";
// import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import useDoVote from "../Hooks/useDoVote";
import useGetVotingGameDetail from "../Hooks/useGetVotingGameDetail";
import useGetVotingParticipant from "../Hooks/useGetVotingParticipant";
import useVotingBoost from "../Hooks/useVotingBoost";
import { getNumberFormatUs } from "../../../utils/formatNumber";

const VoteModal = ({ votingDetail }: { votingDetail: any }) => {
  const isShowModal = useVoting((state: any) => state.isShowModal);
  const showModal = useVoting((state: any) => state.showModal);
  const updateVote = useVoting((state: any) => state.updateVote);
  const modalImg = useVoting((state: any) => state.modalImg);
  const modalText = useVoting((state: any) => state.modalText);
  const modalType = useVoting((state: any) => state.modalType);
  const votePower = useVoting((state: any) => state.votePower);

  const index = useVoting((state: any) => state.index);
  const setResult = useVoting((state: any) => state.setResult);
  const cm = useVoting((state: any) => state.cm);

  const tele = window.Telegram.WebApp;
  const userID = tele.initDataUnsafe?.user?.id;

  const handleCopyLink = () => {
    toast.success("Link copied to clipboard", {
      autoClose: 2000,
      style: { maxWidth: 337, height: 40, borderRadius: 8 },
    });
  };

  const [recheck, setRecheck] = useState(false);

  // const VotingGames = useGetVotingGames();
  const VotingGameDetail = useGetVotingGameDetail(votingDetail?.id);
  const VotingParticipant = useGetVotingParticipant(votingDetail?.id);
  const boostedCheck = VotingParticipant?.data?.data?.data?.vote?.boosted;
  const votePowerCheck = VotingParticipant?.data?.data?.data?.vote?.vote_power;

  const [boosted, setBoosted] = useState(boostedCheck);

  // useEffect(() => {
  //   if (boostedCheck || !recheck) return;
  //   if (boostedCheck) {
  //     setRecheck(false);
  //     setBoosted(true);
  //   } else {
  //     setTimeout(() => {
  //       setRecheck(false);
  //       setBoosted(false);
  //       toast.success("You are not eligible for a boost", {
  //         style: {
  //           maxWidth: 337,
  //           height: 40,
  //           borderRadius: 8,
  //         },
  //         autoClose: 2000,
  //       });
  //     }, 5000);
  //   }
  // }, [boostedCheck, recheck]);

  const DoVote = useDoVote();
  const DoBoost = useVotingBoost();

  const handleDoVote = () => {
    DoVote.mutateAsync({ votingId: votingDetail?.id, cmId: cm?.id })
      .then(() => {
        VotingGameDetail.refetch();
        VotingParticipant.refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Request timeout", {
          autoClose: 2000,
          style: { maxWidth: 337, height: 40, borderRadius: 8 },
        });
        console.log(err);
      });
  };

  const handleRecheck = () => {
    handleDoBoost();
    setRecheck(true);
  };

  const handleDoBoost = () => {
    DoBoost.mutateAsync(votingDetail?.id)
      .then(() => {
        setTimeout(() => {
          VotingGameDetail.refetch();
          VotingParticipant.refetch();
          setRecheck(false);
          setBoosted(true);
        }, 600);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 2000 });
        console.log(err);
        setRecheck(false);
      });
  };

  return (
    <div
      className={clsx(
        "bg-black/70 absolute z-50 inset-0 flex items-center justify-center",
        isShowModal ? " visible" : " invisible"
      )}
    >
      <div
        className={clsx(
          "bg-[#F2FFE0] rounded-[20px] p-[24px] flex flex-col gap-4 items-center justify-center relative",
          isShowModal ? "translate-y-0" : "translate-y-[300%]",
          "transition-all duration-300"
        )}
      >
        {modalImg?.length === 1 && modalType === MODAL_TYPE.VOTE && (
          <div className="flex items-center justify-center gap-4 -ml-[20px]">
            <img
              src={modalImg[0]}
              alt="top"
              className="h-[84px] aspect-square object-cover rounded-full border-[3px] border-[#A1D953]"
            />
            <div className="max-w-[200px]">{modalText}</div>
          </div>
        )}
        {modalImg?.length === 1 && modalType === MODAL_TYPE.BOOST && (
          <>
            <img
              src={modalImg[0]}
              alt="top"
              className="h-[84px] aspect-square object-cover rounded-full border-[3px] border-[#A1D953]"
            />
            <div className="text-center w-[250px]">{modalText}</div>
          </>
        )}
        {modalImg?.length === 2 && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <img
                  src={modalImg[1]}
                  alt="top"
                  className="h-[84px] aspect-square object-cover rounded-full border-[3px] border-[#A1D953]"
                />
                <div className="font-[500] text-sm">
                  {boostedCheck
                    ? getNumberFormatUs(votePowerCheck / 2) + " x 2"
                    : votePowerCheck}{" "}
                  vote power
                </div>
              </div>
              <div className="mb-4">
                <img
                  src={"/images/voting/arrow.png"}
                  alt="top"
                  className="h-[40px] w-[40px] object-fill"
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={modalImg[0]}
                  alt="top"
                  className="h-[84px] aspect-square object-cover rounded-full border-[3px] border-[#A1D953]"
                />
                <div className="font-[500] text-sm">
                  {boostedCheck ? votePower + " x 2" : votePower} vote power
                </div>
              </div>
            </div>
            <div className="text-center w-[250px] text-sm">{modalText}</div>
          </>
        )}
        <div className="w-[250px]">
          {modalType === MODAL_TYPE.VOTE && (
            <Button
              onClick={() => {
                handleDoVote();
                updateVote(true);
                showModal(false);
                index === 0 || index === 4
                  ? setResult("win")
                  : setResult("lose");
              }}
              // startIcon={<img src="images/icons/copy.svg" alt="copy" />}
              className={clsx(
                "font-bold capitalize text-[16px] text-white py-2 lsm:py-[18px] w-full rounded-xl ",
                "btn-hover  bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
              )}
            >
              Yep
            </Button>
          )}
          {modalType === MODAL_TYPE.REVOTE && (
            <Button
              onClick={() => {
                updateVote(false);
                showModal(false);
              }}
              // startIcon={<img src="images/icons/copy.svg" alt="copy" />}
              className={clsx(
                "font-bold capitalize text-[16px] text-white py-2 lsm:py-[18px] w-full rounded-xl ",
                "btn-hover  bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
              )}
            >
              Yep
            </Button>
          )}
          {modalType === MODAL_TYPE.BOOST && (
            <div className="flex gap-[5px] max-h-[50px]">
              <CopyToClipboard
                text={`${process.env.REACT_APP_BOT_URL}startapp=${String(
                  userID
                )}`}
              >
                <div
                  onClick={() => {
                    handleCopyLink();
                    showModal(false);
                  }}
                  // startIcon={<img src="images/icons/copy.svg" alt="copy" />}
                  className={clsx(
                    "font-bold text-[13.5px] text-white py-2 lsm:py-[18px] flex-1 rounded-xl flex items-center justify-center",
                    "btn-hover bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
                  )}
                >
                  Invite
                  <img
                    className="w-5 h-[22px] ml-2"
                    src="images/icons/invite.svg"
                    alt=""
                  ></img>
                </div>
              </CopyToClipboard>
              <div
                // onClick={() => setRecheck(true)}
                onClick={handleRecheck}
                className={clsx(
                  // boosted && "pointer-events-none",
                  "font-bold text-[13.5px] text-white py-2 lsm:py-[18px] flex-1 rounded-xl flex items-center justify-center",
                  !boosted
                    ? "btn-hover bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B] text-white"
                    : "pointer-events-none bg-[#BACCA0] text-[#5D802C]"
                )}
              >
                {boosted ? (
                  "Boosted"
                ) : (
                  <div className="flex gap-2 items-center">
                    Check task
                    <div className={clsx(recheck && "rotateVoting")}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.0625 0.3125C16.6602 0.3125 17.1875 0.839844 17.1875 1.4375V6.5C17.1875 7.13281 16.6602 7.625 16.0625 7.625H11.5625C10.9297 7.625 10.4375 7.13281 10.4375 6.5C10.4375 5.90234 10.9297 5.375 11.5625 5.375H13.1094C12.125 4.00391 10.5078 3.125 8.75 3.125C6.39453 3.125 4.32031 4.63672 3.61719 6.85156C3.44141 7.44922 2.80859 7.76562 2.21094 7.58984C1.61328 7.41406 1.29688 6.78125 1.47266 6.18359C2.49219 3.01953 5.41016 0.875 8.75 0.875C11.2461 0.875 13.5312 2.10547 14.9375 4.07422V1.4375C14.9375 0.839844 15.4297 0.3125 16.0625 0.3125ZM15.2539 9.94531C15.8516 10.1211 16.168 10.7539 15.957 11.3516C14.9375 14.5156 12.0195 16.625 8.71484 16.625C6.21875 16.625 3.93359 15.4297 2.5625 13.4609V16.0625C2.5625 16.6953 2.03516 17.1875 1.4375 17.1875C0.804688 17.1875 0.3125 16.6953 0.3125 16.0625V11C0.3125 10.4023 0.804688 9.875 1.4375 9.875H5.9375C6.53516 9.875 7.0625 10.4023 7.0625 11C7.0625 11.6328 6.53516 12.125 5.9375 12.125H4.35547C5.33984 13.5312 6.95703 14.375 8.75 14.375C11.0703 14.375 13.1445 12.8984 13.8477 10.6836C14.0234 10.0859 14.6562 9.76953 15.2539 9.94531Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => showModal(false)}
          className=" absolute -right-4 -top-5 btn-hover bg-white rounded-full drop-shadow-[0_4px_0px_#4C7E0B]"
        >
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23 46C10.2422 46 0 35.7578 0 23C0 10.332 10.2422 0 23 0C35.668 0 46 10.332 46 23C46 35.7578 35.668 46 23 46ZM15.7227 15.7227C14.8242 16.6211 14.8242 17.9688 15.7227 18.7773L19.9453 23L15.7227 27.2227C14.8242 28.1211 14.8242 29.4688 15.7227 30.2773C16.5312 31.1758 17.8789 31.1758 18.6875 30.2773L22.9102 26.0547L27.1328 30.2773C28.0312 31.1758 29.3789 31.1758 30.1875 30.2773C31.0859 29.4688 31.0859 28.1211 30.1875 27.2227L25.9648 23L30.1875 18.7773C31.0859 17.9688 31.0859 16.6211 30.1875 15.7227C29.3789 14.9141 28.0312 14.9141 27.1328 15.7227L22.9102 19.9453L18.6875 15.7227C17.8789 14.9141 16.5312 14.9141 15.7227 15.7227Z"
              fill="url(#paint0_linear_3658_4024)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3658_4024"
                x1="6.9"
                y1="6.9"
                x2="34.5"
                y2="41.975"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#97C35B" />
                <stop offset="1" stop-color="#63A803" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
