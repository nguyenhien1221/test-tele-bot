/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect } from "react";

import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";
import clsx from "clsx";
import Stars from "../common/Stars";
import { useChangeMode } from "../../store/modeStore";

const HomeLayout = () => {
  const theme = useChangeMode((state: any) => state.mode);
  const mode = localStorage.getItem("mode");

  useEffect(() => {
    localStorage.setItem("mode", mode === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [mode, theme]);

  return (
    <div
      className={clsx(
        "h-full bg-gradient-to-b from-[#F7FFEB] via-[#E4FFBE] to-[#79B22A] fixed z-10 left-0 right-0 bottom-0 top-0",
        "dark:bg-none dark:bg-[#030C02]"
      )}
    >
      <div>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        {mode === "dark" && <Stars />}
        <div className="hidden dark:block fixed h-[194px] bottom-0 left-0 z-0">
          <img
            src="/images/darkmodebg.png"
            className="object-fill w-full"
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
