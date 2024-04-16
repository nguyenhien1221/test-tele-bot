import React, { Suspense } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Loading from "../common/Loading";

const HomeLayout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  console.log(location);

  const tele = window.Telegram.WebApp;
  tele.setHeaderColor(isHomePage ? "#F8FFE1" : "#FFF5CF");

  return (
    <div className="h-screen bg-gradient-to-b from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2]">
      <div>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeLayout;
