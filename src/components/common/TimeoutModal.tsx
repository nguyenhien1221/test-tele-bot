import { Button } from "@mui/material";
import clsx from "clsx";
import React from "react";

interface ModalPropsType {
  handleClose: () => void;
}

const TimeoutModal = ({ handleClose }: ModalPropsType) => {
  return (
    <div className="fixed z-50 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-70">
      <div
        className={clsx(
          "h-screen w-screen overflow-hidden px-4 pb-[140px] relative flex justify-center items-end",
          "dark:bg-transparent dark:bg-gradient-to-b from-transparent via-transparent to-transparent "
        )}
      >
        <div
          className={clsx(
            "flex flex-col justify-center p-6 items-center z-30",
            "h-[336px] w-[289px] bg-[#F2FFE0] rounded-3xl"
          )}
        >
          <img
            className="h-[135px] w-[127px] mb-2"
            src={`/images/timeout.png?v=3`}
            alt=""
          ></img>
          <div className="text-center ">
            <p className="text-2xl font-extrabold mb-2">Timeout</p>
            <p className="mb-6">
              Valid within 24 hours from now.
              <br /> Keep tapping next time!
            </p>
          </div>
          <Button
            onClick={handleClose}
            className={clsx(
              "capitalize text-[#fff] rounded-lg text-[16px] w-full bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B] ",
              "btn-hover disabled:bg-[#B1B1B1] disabled:drop-shadow-[0_4px_1px_#797979] disabled:border-[#C4C4C4]"
            )}
          >
            Close App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeoutModal;
