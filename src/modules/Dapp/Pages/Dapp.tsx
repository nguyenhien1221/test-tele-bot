import DappItem from "../Components/DappItem";

const Dapp = () => {
  const appItems = [
    { title: "Amount", value: "??? $TBA" },
    { title: "Token Price", value: "??? $TBA" },
    { title: "Per Ticket", value: "??? $TBA" },
    { title: "Tickets", value: "??? $TBA" },
    { title: "Ticket Price", value: "??? $TBA" },
  ];
  return (
    <div className="py-[42px] px-4  bg-[#F2FFE0] dark:bg-transparent h-screen relative z-30">
      <div className="w-full max-h-full overflow-auto">
        {[...Array(2)].map((item, index) => {
          const number = index + 1;
          return <DappItem dappItems={appItems} numberOfItems={number} />;
        })}
      </div>
    </div>
  );
};

export default Dapp;
