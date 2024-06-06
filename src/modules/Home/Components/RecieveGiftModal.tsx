import clsx from "clsx";

interface RecieveGiftModalProps {
  handleClose: () => void;
}

const RecieveGiftModal = ({ handleClose }: RecieveGiftModalProps) => {
  return (
    <div
      onClick={handleClose}
      className="fixed z-50 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-70"
    >
      <div
        className={clsx(
          "h-screen w-screen overflow-hidden flex flex-col flex-1 px-4 pb-[140px]"
        )}
      >
        <div className="h-[180px]">
        </div>
        <div
          className={clsx(
            "flex flex-1 max-h-[382px] justify-center bg-no-repeat bg-contain bg-center z-30 relative",
          )}
          style={{
            backgroundImage: "url('/images/trees/8.png?v=3')",
          }}
        >
          <div
            className={clsx(
              "max-h-[90px] min-h-[90px] flex items-end gap-4 justify-end",
              "absolute -bottom-6 right-0"
            )}
          >
            <div className="text-white text-center font-semibold  right-[100px] bottom-0">
              Tap 10 times to <br />
              unbox special gift
            </div>
            <img
              className="h-[110px] w-[88px]  right-0 bottom-0"
              src="/images/icons/arrowguide.png"
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecieveGiftModal;
