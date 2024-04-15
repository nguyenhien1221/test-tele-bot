import React from "react";
import { Button } from "@mui/material";
import { socialItems } from "../../../constants/socials.constants";

interface ModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
}

const MissionsModal = ({ closeModal }: ModalPropsType) => {
  return (
    <>
      <div
        onClick={closeModal}
        className="fixed z-0 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-50"
      ></div>
      <div className="fixed py-4  bottom-0 left-0 flex flex-col items-center h-[85%] px-4 w-full rounded-t-2xl bg-gradient-to-b from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
        <div className="h-[5px] absolute -top-[14px] w-10 bg-white rounded-2xl"></div>
        <div className="overflow-auto w-full ">
          <div className="flex flex-col items-center ">
            <p className="text-[24px] font-bold">Follow on Twitter</p>
            <p className="text-center font-normal">
              Every subscription +1 Gas Free.
              <br /> Tap to open Twitter account.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[34px] mb-[38px] mt-[42px]">
          {socialItems.map((item, index) => (
            <div className="text-center">
              <img src={item.icon} width={80} alt="logo"></img>
              <p className="mt-3 font-medium text-sm">{item.title}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={closeModal}
          className="font-bold bg-gradient-to-r from-[#FBB500] to-[#FB2963] text-white py-[18px] w-full rounded-xl drop-shadow-lg "
        >
          got it
        </Button>
      </div>
    </>
  );
};

export default MissionsModal;
