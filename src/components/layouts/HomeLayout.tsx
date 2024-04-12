import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";

const HomeLayout = () => {
  return (
    <div className="bg-gradient-to-b h-screen from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2] overflow-auto">
      <div>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeLayout;
