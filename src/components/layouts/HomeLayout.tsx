import { Suspense } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Loading from "../common/Loading";

const HomeLayout = () => {
  const location = useLocation();

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
