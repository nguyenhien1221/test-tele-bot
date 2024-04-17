import React from "react";
import { Button } from "@mui/material";
import { socials } from "../../../constants/missions.constants";
import { getMissionsByType } from "../Utils/missions";
import { socialItems } from "../../../constants/socials.constants";

interface ModalPropsType {
  data: any;
  type: number;
  isOpen: boolean;
  closeModal: () => void;
  handleDoMission: (id: string) => void;
}

const MissionsModal = ({
  closeModal,
  type,
  data,
  handleDoMission,
}: ModalPropsType) => {
  const missions = getMissionsByType(type, data);

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
            <p className="text-[24px] font-bold">Follow on {socials[type]}</p>
            <p className="text-center font-normal">
              Every subscription +0.02 SEED.
              <br /> Tap to open {socials[type]} account.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[34px] mb-[38px] mt-[42px]">
          {missions?.map((item: any, index: number) => (
            <a
              onClick={() => handleDoMission(item.id)}
              href={item.metadata.url}
              target="_blank"
              rel="noreferrer"
              className="text-center relative"
            >
              {item.task_user != null && (
                <img
                  className="absolute -right-3 -top-3"
                  src="/images/icons/checkmark.svg"
                  alt=""
                ></img>
              )}
              <img src={item.metadata.images_url} width={80} alt="logo"></img>
              <p className="mt-3 font-semibold text-sm">{item.metadata.name}</p>
            </a>
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
