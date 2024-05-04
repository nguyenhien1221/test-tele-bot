import { Suspense } from "react";

import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";
import clsx from "clsx";
import Stars from "../common/Stars";

const HomeLayout = () => {
  const mode = localStorage.getItem("mode");
  if (mode === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <div
      className={clsx(
        "h-screen bg-gradient-to-b from-[#F7FFEB] via-[#E4FFBE] to-[#79B22A]",
        "dark:bg-none dark:bg-[#0a0c0a]"
      )}
    >
      <div>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        {mode === "dark" && <Stars />}
        <div className="hidden dark:block absolute bottom-0 left-0 z-0">
          <img src="/images/darkmodebg.png" alt=""></img>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
