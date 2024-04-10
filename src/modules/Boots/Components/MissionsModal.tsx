import React from "react";
import MissionsItem from "./MissionsItem";
import { Button } from "@mui/material";

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
      <div className="fixed py-4  bottom-0 left-0 flex flex-col items-center h-[80%] px-4 w-full rounded-t-2xl bg-gradient-to-b from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7]">
        <div className="h-[5px] absolute -top-[14px] w-10 bg-white rounded-2xl"></div>
        <div className="overflow-auto w-full ">
          <div className="flex flex-col items-center ">
            <p className="text-[24px] font-bold">Storage</p>
            <p className="text-center font-normal">
              Increase the storage capacity
              <br />
              of the mined
            </p>
          </div>
          <div className="mt-8 mb-[26px] w-full">
            <MissionsItem level={2} />
            <div className="flex justify-center">
              <img
                className="my-5"
                src="/images/icons/uparrow.svg"
                width={21}
                height={28}
                alt="arrow"
              ></img>
            </div>
            <MissionsItem level={1} />
          </div>
          <div className="flex justify-center gap-2 mb-[17px]">
            <img
              src="/images/icons/token_icon.svg"
              width={32}
              height={32}
              alt="token"
            ></img>
            <p className="text-[24px] font-bold">0.2</p>
          </div>
        </div>

        <Button className="font-bold bg-gradient-to-r from-[#FBB500] to-[#FB2963] text-white py-[18px] w-full rounded-xl drop-shadow-lg ">
          UPGRADE
        </Button>
      </div>
    </>
  );
};

export default MissionsModal;
