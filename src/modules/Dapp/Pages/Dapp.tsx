import { useNavigate } from "react-router-dom";
import DappItem from "../Components/DappItem";

const Dapp = () => {
  console.debug('cache prune - 2');
  const tele = window.Telegram.WebApp;
  const navigate = useNavigate();

  tele.BackButton.show();
  tele.BackButton.onClick(() => handleBackBtn());
  const handleBackBtn = () => {
    navigate("/");
  };
  const appItem1 = [
    { title: "Amount", value: "??? $TBA" },
    { title: "Token Price", value: "??? SEED" },
    { title: "Per Ticket", value: "??? $TBA" },
    { title: "Tickets", value: "???" },
    { title: "Ticket Price", value: "??? SEED" },
  ];

  const appItem2 = [
    { title: "Total NFTs", value: "??? TBA" },
    { title: "Floor price", value: "??? SEED" },
    { title: "Unit per user", value: "??? Ticket(s)" },
  ];
  return (
    <div className="py-[42px] px-4  bg-[#F2FFE0] dark:bg-transparent h-screen relative z-30">
      <div className="w-full max-h-full overflow-auto">
        <DappItem dappItems={appItem1} numberOfItems={1} />
        <DappItem dappItems={appItem2} numberOfItems={2} />
      </div>
    </div>
  );
};

export default Dapp;
