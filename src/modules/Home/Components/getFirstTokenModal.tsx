import { LoadingButton } from "@mui/lab";
import clsx from "clsx";

interface ModalPropsType {
  isLoading: boolean;
  reward: number;
  closeModal: () => void;
  handleClaim: () => void;
}

const GetFirstTokenModal = ({
  isLoading,
  reward,
  closeModal,
  handleClaim,
}: ModalPropsType) => {
  const isSmallScreen = window.innerHeight <= 520;

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed z-0 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-50"
      ></div>
      <div className="fixed z-40 pb-4 pt-10  bottom-0 left-0 flex flex-col items-center h-[75%] px-4 w-full rounded-t-2xl bg-[#F2FFE0]">
        <div className="h-[5px] absolute -top-[14px] w-10 bg-white rounded-2xl"></div>
        <div
          className={clsx(
            "max-h-[117px] w-full mb-2 flex flex-1 justify-center bg-no-repeat bg-contain bg-center",
            isSmallScreen ? "max-h-[100px]" : ""
          )}
          style={{ backgroundImage: "url('/images/icons/token_icon.png')" }}
        ></div>
        <div className="text-[32px] font-black">{`+${reward} SEED`}</div>

        <div className="text-center font-normal mt-4">
          🌱 <span>{`${reward} SEED is added to your balance as `}</span>
          <b>Special Gift</b>
          {` for `}
          <b>New Farmers!</b>
          <br />
        </div>

        <LoadingButton
          loading={isLoading}
          onClick={() => handleClaim()}
          className="capitalize text-[16px]  fixed bottom-10 left-4 right-4 font-bold bg-gradient-to-r from-[#97C35B] to-[#61A700]  border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B] hover:drop-shadow-none text-white py-[18px] rounded-xl "
        >
          Claim
        </LoadingButton>
      </div>
    </>
  );
};

export default GetFirstTokenModal;
