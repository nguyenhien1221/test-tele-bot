import React, { Suspense } from "react";
import NavBar from "../common/NavBar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="bg-gradient-to-b relative h-screen from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2] pb-[40px] ">
      <div className="px-4">
        <Suspense fallback="...loading">
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeLayout;
