import { Button } from "@mui/material";
import About from "../Components/About";
import Mining from "../Components/Mining";
import { useEffect, useState } from "react";
import Register from "../Components/Register";
import { useNavigate } from "react-router-dom";

const CreateAcount = () => {
  const tele = window.Telegram.WebApp;

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());

  const navigate = useNavigate();
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
      return "Start";
    }
  };

  const handleChangeTab = () => {
    if (tab >= 2) {
      navigate("/");
      return;
    }
    setTab(tab + 1);
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
