import { Button, Modal } from "@mui/material";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NotifiModal = ({ isOpen, handleClose }: ModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div className="w-[277px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F2FFE0] p-[25px] rounded-3xl">
        <h2 className="text-2xl font-extrabold text-center mb-2">
          Congratulations
        </h2>
        <p className="text-center font-normal mb-6">
          You created an account during the event so you will get x2 seed speed
        </p>
        <div className="flex justify-center ">
          <Button
            onClick={handleClose}
            className={clsx(
              "capitalize text-white py-3 px-8",
              "bg-gradient-to-r from-[#97C35B] to-[#61A700]  border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B]",
              "hover:drop-shadow-none"
            )}
          >
            Got it
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NotifiModal;
