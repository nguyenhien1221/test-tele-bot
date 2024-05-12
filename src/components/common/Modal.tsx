import clsx from "clsx";

import { useRef } from "react";

interface ModalPropsType {
  closeModal: () => void;
  children: any;
}

const Modal = ({ closeModal, children }: ModalPropsType) => {
  const modalRef = useRef<any>();
  const pageRef = useRef<any>();

  let startY: number | null = null;
  let startHeight: number | null = null;

  const getMouseDown = (clientY: any) => {
    startY = clientY;
    if (modalRef?.current) {
      startHeight = modalRef?.current?.offsetHeight as number;
    }
    if (pageRef?.current) {
      pageRef.current.style = "pointer-events: auto";
    }
  };

  const getMouseUp = () => {
    startY = null;
    startHeight = null;
    if (pageRef?.current) {
      pageRef.current.style = "pointer-events: none";
    }
    modalRef.current.style.height = "90%";
    // modalRef.current.style.maxHeigth = 567;
  };
  const resizeChart = (clientY: number) => {
    if (startY !== null && modalRef?.current && startHeight !== null) {
      const distance = startY - clientY;
      modalRef.current.style = `height: ${startHeight + distance + "px"}`;

      if (
        typeof window !== "undefined" &&
        window?.innerHeight - clientY <= window?.innerHeight * 0.4
      ) {
        getMouseUp();
        closeModal();
      }
    }
  };
  return (
    <>
      <div
        ref={pageRef}
        style={{ pointerEvents: "none" }}
        className="fixed w-[100vw] h-[100vh] top-0 left-0 cursor-ns-resize z-[100]"
        onMouseMove={(e) => resizeChart(e?.clientY)}
        onTouchMove={(e) => {
          resizeChart(
            e?.changedTouches?.[e?.changedTouches?.length - 1]?.clientY
          );
        }}
        onMouseUpCapture={() => getMouseUp()}
        onTouchEnd={() => getMouseUp()}
      />
      <div
        onClick={closeModal}
        className="fixed z-10 flex flex-col-reverse items-center w-full h-full top-0 left-0 bg-black bg-opacity-50"
      ></div>
      <div
        onMouseUpCapture={() => getMouseUp()}
        onTouchEnd={() => getMouseUp()}
        ref={modalRef}
        className={clsx(
          "slide-in fixed py-4 pb-[20] px-4 z-30 left-0 flex flex-col items-center  w-full rounded-t-2xl bg-[#F2FFE0]",
          "dark:bg-[#0a0c0a] dark:shadow-[0_-2px_8px_#FFFFFF40] max-h-[567px]"
        )}
        style={{ height: "90%" }}
      >
        <div
          className="flex w-full py-3 absolute -top-[26px] items-center justify-center cursor-s-resize"
          onMouseDownCapture={(e) => getMouseDown(e?.clientY)}
          onTouchStartCapture={(e) =>
            getMouseDown(
              e?.changedTouches?.[e?.changedTouches?.length - 1]?.clientY
            )
          }
          onTouchMove={(e) => {
            resizeChart(
              e?.changedTouches?.[e?.changedTouches?.length - 1]?.clientY
            );
          }}
          onTouchEnd={() => getMouseUp()}
        >
          <div className="h-[5px] w-10 bg-white rounded-2xl"></div>
        </div>
        <div
          className="min-h-[calc(90vh-32px)] w-full relative"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
