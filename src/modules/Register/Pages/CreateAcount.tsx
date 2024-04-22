/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import About from "../Components/About";
import Mining from "../Components/Mining";
import { useEffect, useState } from "react";
import Register from "../Components/Register";
import { useNavigate } from "react-router-dom";
import useCreateAcount from "../../../components/Hooks/useCreateAcount";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { registerImgs } from "../../../constants/register";

const CreateAcount = () => {
  const tele = window.Telegram.WebApp;

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const navigate = useNavigate();

  const qc = useQueryClient();
  const createAcount = useCreateAcount();

  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    if (tab === 0) {
      const tele = window.Telegram.WebApp;

      tele.BackButton.hide();
    }
  }, [tab]);

  const handleBackBtn = () => {
    if (tab === 1) {
      setTab(0);
    }
    if (tab === 2) {
      setTab(1);
    }
  };

  const renderContent = () => {
    if (tab === 0) {
      return <Register />;
    }
    if (tab === 1) {
      return <Mining />;
    }
    if (tab === 2) {
      return <About />;
    }
  };

  const renderButtonText = () => {
    if (tab === 0) {
      return "Create new account";
    }
    if (tab === 1) {
      return "Next";
    }
    if (tab === 2) {
      return "Start Sowing";
    }
  };

  const handleChangeTab = () => {
    setTab(tab + 1);
    if (tab >= 2) {
      createAcount
        .mutateAsync()
        .then((data) => {
          qc.invalidateQueries({
            queryKey: ["AcountDetails"],
          }).then(() => navigate("/"));
        })
        .catch((err: any) => {
          toast.error(err, { autoClose: 2000 });
        });

      return;
    }
  };

  return (
    <div className="bg-gradient-to-b h-screen from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7] px-4 py-[120px]">
      <div className="flex flex-col h-full">
        <div
          className="flex-1 h-28 max-h-[223px] bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${registerImgs[tab]})` }}
        ></div>
        {renderContent()}
        {tab <= 2 && (
          <Button
            onClick={() => handleChangeTab()}
            className="fixed bottom-[55px] left-4 right-4 capitalize font-extrabold  bg-gradient-to-r from-[#FBB500] to-[#FB2963] text-white py-[18px] rounded-xl drop-shadow-lg"
          >
            {renderButtonText()}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateAcount;
