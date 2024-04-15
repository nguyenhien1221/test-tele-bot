import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";

const HomeLayout = () => {
  const tele = window.Telegram.WebApp;
  tele.setHeaderColor("#FFF5CF");

  return (
    <div className="">
      <div>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeLayout;
