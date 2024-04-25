import { LoadingButton } from "@mui/lab";

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
  const isOver = new Date().getTime() - new Date("5/4/2024").getTime() > 0;

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed z-0 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-50"
      ></div>
      <div className="fixed z-20 pb-4 pt-10  bottom-0 left-0 flex flex-col items-center h-[75%] px-4 w-full rounded-t-2xl bg-gradient-to-b from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
        <div className="h-[5px] absolute -top-[14px] w-10 bg-white rounded-2xl"></div>
        <div
          className="max-h-[117px] w-full mb-2 flex flex-1 justify-center bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: "url('/images/icons/token_icon.svg')" }}
        ></div>
        <div className="text-[32px] font-black">+{reward}SEED</div>
        {isOver ? (
          <div className="text-center font-normal mt-4">
            🌱 You're now part of SEED DAO!
            <br />
            🌟 <span className="font-bold">{reward} SEED</span> is gifted for{" "}
            <span className="font-black">Early Farmers.</span>
            <br />
            Let's grow together! Happy planting!
          </div>
        ) : (
          <div className="text-center font-normal mt-4">
            🌱 You're now part of SEED DAO!
            <br />
            🌟 <span className="font-bold">{reward} SEED</span> is gifted for{" "}
            <span className="font-black">
              Early Farmers during the first 3 days!
            </span>
            <br />
            Let's grow together! Happy planting!
          </div>
        )}

        <LoadingButton
          loading={isLoading}
          onClick={() => handleClaim()}
          className="capitalize fixed bottom-10 left-4 right-4 font-bold bg-gradient-to-r from-[#FBB500] to-[#FB2963] text-white py-[18px] rounded-xl drop-shadow-lg"
        >
          Claim
        </LoadingButton>
      </div>
    </>
  );
};

export default GetFirstTokenModal;
