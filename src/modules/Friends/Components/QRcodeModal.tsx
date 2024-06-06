import clsx from "clsx";
import React from "react";
import QRCode from "qrcode.react";

interface ModalProps {
  handleClose: () => void;
  inviteLink: string;
}

const QRcodeModal = ({ handleClose, inviteLink }: ModalProps) => {
  return (
    <div
      onClick={handleClose}
      className="fixed z-30 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-70"
    >
      <div
        className={clsx(
          "h-screen w-screen overflow-hidden flex flex-col flex-1 px-4 pb-[140px]"
        )}
      >
        <div
          className={clsx(
            " fixed z-40 top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] bg-white rounded-[20px]",
            "flex items-center justify-center p-6"
          )}
        >
          {/* close btn  */}
          <div
            onClick={() => handleClose}
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

          <QRCode
            id="qrcode"
            value={inviteLink}
            size={260}
            level={"H"}
            style={{ padding: 4 }}
          />
        </div>
      </div>
    </div>
  );
};

export default QRcodeModal;
