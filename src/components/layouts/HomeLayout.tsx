import { Suspense } from "react";

import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";

const HomeLayout = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-[#F7FFEB] via-[#E4FFBE] to-[#79B22A]">
      <div>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeLayout;
