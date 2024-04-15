/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import About from "../Components/About";
import Mining from "../Components/Mining";
import { useEffect, useState } from "react";
import Register from "../Components/Register";
import { useNavigate } from "react-router-dom";
import useCreateAcount from "../../../components/Hooks/useCreateAcount";
import { toast } from "react-toastify";
import useGetAcountDetails from "../../../components/Hooks/useRegister";
import { ResponseCode } from "../../../constants/response";

const CreateAcount = () => {
  const tele = window.Telegram.WebApp;

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const navigate = useNavigate();

  const createAcount = useCreateAcount();
  const AcountData = useGetAcountDetails();

  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    if (AcountData.data?.status !== ResponseCode.NOT_FOUND) {
      navigate("/");
    }
  }, [AcountData]);

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
      return "Start";
    }
  };

  const handleChangeTab = () => {
    if (tab >= 2) {
      navigate("/");
      return;
    }

    createAcount
      .mutateAsync()
      .then(() => {
        setTab(tab + 1);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="bg-gradient-to-b h-screen from-[#FFFCEF] via-[#FFE9DB] to-[#FFC8D7] px-4 pt-[120px]">
      <div>{renderContent()}</div>
      <Button
        onClick={() => handleChangeTab()}
        className="fixed bottom-[55px] left-4 right-4 bg-gradient-to-r from-[#FBB500] to-[#FB2963] text-white py-[18px] rounded-xl drop-shadow-lg"
      >
        {renderButtonText()}
      </Button>
    </div>
  );
};

export default CreateAcount;
