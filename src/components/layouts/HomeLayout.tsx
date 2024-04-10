import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="">
      <div>
        <Suspense fallback="...loading">
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeLayout;
