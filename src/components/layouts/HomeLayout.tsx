import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="bg-gradient-to-b from-[#FFF5CF] via-[#FFCDAC] to-[#FF80A2] overflow-auto">
      <div>
        <Suspense fallback="...loading">
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeLayout;
