import clsx from "clsx";
import Modal from "../../../components/common/Modal";
import { Button } from "@mui/material";

interface ModalPropsType {
  data: any;
  type: string;
  closeModal: () => void;
  handleDoMission: () => void;
}

const DailyMissonModal = ({
  closeModal,
  data,
  handleDoMission,
}: ModalPropsType) => {
  console.log(data)

  return (
    <>
      <Modal closeModal={closeModal}>
        <div className="flex flex-col h-full">
          <div className="w-full ">
            <div className="flex flex-col items-center ">
              <p className="text-[24px] font-bold">Login Bonus!</p>
              <p>Login every day to claim your rewards!</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-5 max-h-[390px] flex-1 overflow-auto">
            {[...Array(3)].map((item:any ,index: number)=> {
              return (
            <div
              onClick={()=> handleDoMission()}
              className={clsx(
                "w-[100px] h-[114px] pt-[22px] relative cursor-pointer bg-white rounded-xl mb-[18px] flex items-center justify-center",
                "dark:gradient-border-mask-mission dark:bg-transparent",
                "dark:boder-0 dark:drop-shadow-none dark:border-transparent",
                "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C]",
                true ? "border-[#00000080]" : "border-[#B0D381]"
              )}
            >
              <div
                className={clsx(
                  "w-[30px] h-[30px] rounded-[50%] flex items-center justify-center absolute -right-2 -top-4 z-30",
                  "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C] bg-[#7BB52C]"
                )}
              >
                <img
                  src="/images/icons/checkmission.png"
                  className="w-[13px] h-[9px]"
                  alt=""
                ></img>
              </div>
              {false && (
                <div className="absolute z-40 w-full h-full top-0 ">
                  <div className="absolute z-10 bg-black bg-opacity-50 w-full h-full rounded-lg"></div>
                  <img
                    src="/images/daily/lock.svg"
                    className="z-50 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
                    alt=""
                  ></img>
                </div>
              )}

              <div className="absolute text-[11px] font-semibold left-0 top-0  text-white w-[53px] flex items-center h-[19px] bg-[#4E800D] px-[10px] rounded-br-xl rounded-tl-lg">
                {`Day ${index + 1}`}
              </div>
              <div>
                <img
                  src={`/images/daily/${index + 1}.png`}
                  className="w-[52px] h-[55px]"
                  alt=""
                ></img>
                <p className="font-semibold text-center">0.06</p>
              </div>
            </div>
            )})} 
            {[...Array(3)].map((item:any ,index: number)=> {
              return (
            <div
              className={clsx(
                "w-[100px] h-[114px] pt-[22px] relative cursor-pointer bg-white rounded-xl mb-[18px] flex items-center justify-center",
                "dark:gradient-border-mask-mission dark:bg-transparent",
                "dark:boder-0 dark:drop-shadow-none dark:border-transparent",
                "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C]",
                true ? "border-[#00000080]" : "border-[#B0D381]"
              )}
            >
              <div
                className={clsx(
                  "w-[30px] h-[30px] rounded-[50%] flex items-center justify-center absolute -right-2 -top-4 z-30",
                  "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C] bg-[#7BB52C]"
                )}
              >
                <img
                  src="/images/icons/checkmission.png"
                  className="w-[13px] h-[9px]"
                  alt=""
                ></img>
              </div>
              {false && (
                <div className="absolute z-40 w-full h-full top-0 ">
                  <div className="absolute z-10 bg-black bg-opacity-50 w-full h-full rounded-lg"></div>
                  <img
                    src="/images/daily/lock.svg"
                    className="z-50 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
                    alt=""
                  ></img>
                </div>
              )}

              <div className="absolute text-[11px] font-semibold left-0 top-0  text-white w-[53px] flex items-center h-[19px] bg-[#4E800D] px-[10px] rounded-br-xl rounded-tl-lg">
                {`Day ${index +4}`}
              </div>
              <div>
                <img
                  src={`/images/daily/${index + 4}.png`}
                  className="w-[52px] h-[55px]"
                  alt=""
                ></img>
                <p className="font-semibold text-center">0.06</p>
              </div>
            </div>
            )})}
            <div
              className={clsx(
                "col-span-3 w-full  pt-[22px] relative cursor-pointer bg-white rounded-xl mb-[18px] flex items-center justify-center",
                "dark:gradient-border-mask-mission dark:bg-transparent",
                "dark:boder-0 dark:drop-shadow-none dark:border-transparent",
                "border-[3px] border-[#B0D381] border-solid drop-shadow-[0_4px_0px_#4D7F0C]",
                true ? "border-[#00000080]" : "border-[#B0D381]"
              )}
            >
             
              {true && (
                <div className="absolute z-40 w-full h-full top-0 ">
                  <div className="absolute z-10 bg-black bg-opacity-50 w-full h-full rounded-lg"></div>
                </div>
              )}
              <img
                src="/images/daily/lock.svg"
                className="z-50 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
                alt=""
              ></img>

              <div className="absolute text-[11px] font-semibold left-0 top-0  text-white w-[53px] flex items-center h-[19px] bg-[#4E800D] px-[10px] rounded-br-xl rounded-tl-lg">
                Day 7
              </div>
              <div>
                <img
                  src="/images/daily/7.png"
                  className="w-[242px] h-[83px]"  
                  alt=""
                ></img>
                <p className="font-semibold text-center">0.06</p>
              </div>
            </div>
          </div>
          <div>
            <Button
              onClick={closeModal}
              className={clsx(
                "capitalize w-full font-bold text-white py-[18px] rounded-xl ",
                "dark:bg-white dark:text-black dark:font-black",
                "hover:drop-shadow-none bg-gradient-to-r from-[#97C35B] to-[#61A700]  border-[3px] border-solid border-[#B0D381] drop-shadow-[0_4px_1px_#4C7E0B]",
                "dark:boder-0 dark:border-transparent dark:bg-none dark:drop-shadow-none"
              )}
            >
              got it
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DailyMissonModal;
