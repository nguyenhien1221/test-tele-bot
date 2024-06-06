
const Anouncement = () => {
  console.debug('cache prune - 2');
  const tele = window.Telegram.WebApp;
  return (
    <div className="bg-[#F2FFE0] h-screen  px-4 py-[120px]">
      <div className="flex flex-col h-full">
        <div
          className="flex-1 h-28 max-h-[223px] bg-no-repeat bg-contain bg-center"
          style={{
            backgroundImage: `url("/images/maintain.png?v=3")`,
          }}
        ></div>
        <div className="flex flex-col items-center pb-2">
          <div className="text-center mt-6 h-[120px]">
            <p className="text-[32px] font-extrabold">SEED MAINTENANCE</p>
            <p>
              We are currently undergoing maintenance to resolve these problems
              and improve your experience
            </p>
          </div>
        </div>
        <div className="pt-10">
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-sm">Follow us</p>
            <div className="flex gap-4 mt-2">
              <div
                onClick={() =>
                  tele.openTelegramLink("https://t.me/seedupdates")
                }
              >
                <img
                  src="/images/icons/telegram.png"
                  alt=""
                  className="w-[32px] h-[32px]"
                ></img>
              </div>
              <div
                onClick={() =>
                  tele.openLink("https://twitter.com/SeedCombinator")
                }
              >
                <img
                  src="/images/icons/twitter.png"
                  alt=""
                  className="w-[32px] h-[32px]"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anouncement;
