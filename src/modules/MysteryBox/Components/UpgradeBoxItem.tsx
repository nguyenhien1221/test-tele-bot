import clsx from "clsx";
import React from "react";

interface UpgradeBoxItemProps {
  level: number;
}

const UpgradeBoxItem = ({ level }: UpgradeBoxItemProps) => {
  return (
    <>
      <div
        className="flex flex-1 max-h-[180px] relative justify-center bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage: `url('/images/box/${level}.png?v=3')`,
        }}
      ></div>
      <div className="flex items-center flex-col mt-2 mb-1">
        <div
          className={clsx(
            "flex items-center justify-center",
            "font-extrabold dark:text-[#fff]"
          )}
        >{`Mystery Box ${level}`}</div>
      </div>
    </>
  );
};

export default UpgradeBoxItem;
