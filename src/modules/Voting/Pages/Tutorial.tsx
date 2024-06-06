import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navPaths } from "../../../constants/navbar.constants";

const PowerMax = () => {
  return (
    <svg
      width="60"
      height="53"
      viewBox="0 0 60 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.9213 18.5593C24.8364 18.5593 20.7543 14.427 20.7543 9.27966C20.7543 4.20485 24.8364 0 29.9213 0C34.9345 0 39.0883 4.20485 39.0883 9.27966C39.0883 14.427 34.9345 18.5593 29.9213 18.5593ZM34.6254 22.0392C41.5006 22.0392 47.0868 27.694 47.0868 34.6537C47.0868 36.0312 45.9409 37.1186 44.5802 37.1186H15.349C13.9883 37.1186 12.9141 36.0312 12.9141 34.6537C12.9141 27.694 18.4286 22.0392 25.3038 22.0392H34.6254Z"
        fill="#4D7F0C"
      />
      <rect x="0.5" y="33.5" width="59" height="19" rx="9.5" fill="#4D7F0C" />
      <rect x="0.5" y="33.5" width="59" height="19" rx="9.5" stroke="#F2FFE0" />
      <path
        d="M5.35449 47V39.9541H8.25977C9.74414 39.9541 10.7354 40.9111 10.7354 42.3613V42.3711C10.7354 43.8213 9.74414 44.7783 8.25977 44.7783H6.8291V47H5.35449ZM7.89844 41.1211H6.8291V43.626H7.89844C8.74316 43.626 9.24121 43.1768 9.24121 42.376V42.3662C9.24121 41.5654 8.74316 41.1211 7.89844 41.1211ZM13.9924 47.1123C12.3371 47.1123 11.341 46.0625 11.341 44.3145V44.3047C11.341 42.5713 12.3518 41.5068 13.9924 41.5068C15.633 41.5068 16.6438 42.5664 16.6438 44.3047V44.3145C16.6438 46.0674 15.6477 47.1123 13.9924 47.1123ZM13.9924 45.9941C14.7492 45.9941 15.1838 45.374 15.1838 44.3145V44.3047C15.1838 43.2549 14.7443 42.625 13.9924 42.625C13.2355 42.625 12.801 43.2549 12.801 44.3047V44.3145C12.801 45.374 13.2307 45.9941 13.9924 45.9941ZM18.4018 47L16.9662 41.624H18.4066L19.2074 45.5156H19.2953L20.2377 41.624H21.5951L22.5424 45.5156H22.6303L23.4311 41.624H24.8422L23.4115 47H21.8979L20.9359 43.25H20.848L19.8959 47H18.4018ZM27.7965 47.1123C26.1607 47.1123 25.1695 46.043 25.1695 44.3193V44.3145C25.1695 42.6055 26.1705 41.5068 27.7379 41.5068C29.3053 41.5068 30.2818 42.5811 30.2818 44.207V44.6514H26.5807C26.5953 45.5352 27.0689 46.0479 27.8258 46.0479C28.4508 46.0479 28.7975 45.7158 28.8951 45.5107L28.9098 45.4814H30.2379L30.2281 45.5303C30.0621 46.2041 29.3687 47.1123 27.7965 47.1123ZM27.7623 42.5762C27.1422 42.5762 26.6832 42.9961 26.5953 43.7578H28.9146C28.8268 42.9766 28.3824 42.5762 27.7623 42.5762ZM31.2488 47V41.624H32.6746V42.459H32.7625C32.9334 41.8779 33.4217 41.5361 34.1199 41.5361C34.3104 41.5361 34.5105 41.5654 34.6521 41.6045V42.8496C34.4373 42.8008 34.2176 42.7666 33.9979 42.7666C33.1873 42.7666 32.6746 43.2305 32.6746 43.9922V47H31.2488ZM39.5061 47V41.3457H39.4182L37.6896 42.5469V41.2188L39.5109 39.9541H40.9807V47H39.5061ZM45.4096 47.1807C43.6713 47.1807 42.6117 45.7549 42.6117 43.4795V43.4697C42.6117 41.1895 43.6713 39.7734 45.4096 39.7734C47.1527 39.7734 48.2074 41.1895 48.2074 43.4697V43.4795C48.2074 45.7549 47.1527 47.1807 45.4096 47.1807ZM45.4096 46.0137C46.2445 46.0137 46.7182 45.0713 46.7182 43.4795V43.4697C46.7182 41.873 46.2445 40.9404 45.4096 40.9404C44.5795 40.9404 44.1059 41.873 44.1059 43.4697V43.4795C44.1059 45.0713 44.5795 46.0137 45.4096 46.0137ZM52.0553 47.1807C50.317 47.1807 49.2574 45.7549 49.2574 43.4795V43.4697C49.2574 41.1895 50.317 39.7734 52.0553 39.7734C53.7984 39.7734 54.8531 41.1895 54.8531 43.4697V43.4795C54.8531 45.7549 53.7984 47.1807 52.0553 47.1807ZM52.0553 46.0137C52.8902 46.0137 53.3639 45.0713 53.3639 43.4795V43.4697C53.3639 41.873 52.8902 40.9404 52.0553 40.9404C51.2252 40.9404 50.7516 41.873 50.7516 43.4697V43.4795C50.7516 45.0713 51.2252 46.0137 52.0553 46.0137Z"
        fill="white"
      />
    </svg>
  );
};

const PageOne = ({ setPage }: { setPage: any }) => {
  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="font-semibold text-[22px]">Guideline (1/2)</p>
        <div className=" flex items-center justify-center gap-[10px] px-4 py-[10px] border border-[#BCD895] rounded-2xl">
          <PowerMax />
          <div className="text-sm">
            At the beginning, each player has 100 vote power.
          </div>
        </div>
        <div className="flex items-center gap-2 mt-[3px]">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <div>
                <img
                  src={`/images/voting/${index + 1}.png`}
                  alt={"cm"}
                  className="w-[46px] border-[3px] rounded-full aspect-square object-cover border-[#A1D953] drop-shadow-[0_4px_0px_#00000050]"
                />
              </div>
            );
          })}
        </div>
        <div className="text-center text-sm">
          Choose any CM you want to vote for
          <p className="text-xs">(You can revote at any time)</p>
        </div>
        <div className="w-full">
          <svg
            width="100%"
            height="2"
            viewBox="0 0 339 2"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H339" stroke="#4D7F0C" stroke-dasharray="6 6" />
          </svg>
        </div>
        <div className=" flex items-center justify-center gap-[5px] px-4 py-[10px] border border-[#BCD895] rounded-2xl">
          <img
            src={"/images/voting/guide_clock.png"}
            alt={"guide_clock"}
            className="h-[60px] aspect-square object-contain"
          />
          <div className="text-sm">
            The later you vote, the lower your vote power
          </div>
        </div>
        <div>
          <img
            src={"/images/voting/tut-content.png"}
            alt={"guide_clock"}
            className="h-[175px] w-full object-contain dark:bg-white"
          />
        </div>
        <div className="text-center text-xs mt-2">
          The score of a CM is the total vote power of the players who vote for
          them
        </div>
        <div
          onClick={() => setPage(1)}
          className="flex w-full items-center gap-2 justify-end cursor-pointer"
        >
          <p className="text-[18px]">Next</p>
          <div className="dark:hidden">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6797 1.27344L17.5547 7.83594C17.75 8.03125 17.8672 8.26562 17.8672 8.53906C17.8672 8.77344 17.75 9.00781 17.5547 9.20312L10.6797 15.7656C10.3281 16.1172 9.70312 16.1172 9.35156 15.7266C9 15.375 9 14.75 9.39062 14.3984L14.5859 9.47656H1.30469C0.757812 9.47656 0.367188 9.04688 0.367188 8.53906C0.367188 7.99219 0.757812 7.60156 1.30469 7.60156H14.5859L9.39062 2.64062C9 2.28906 9 1.66406 9.35156 1.3125C9.70312 0.921875 10.2891 0.921875 10.6797 1.27344Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="hidden dark:block">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6797 1.27344L17.5547 7.83594C17.75 8.03125 17.8672 8.26562 17.8672 8.53906C17.8672 8.77344 17.75 9.00781 17.5547 9.20312L10.6797 15.7656C10.3281 16.1172 9.70312 16.1172 9.35156 15.7266C9 15.375 9 14.75 9.39062 14.3984L14.5859 9.47656H1.30469C0.757812 9.47656 0.367188 9.04688 0.367188 8.53906C0.367188 7.99219 0.757812 7.60156 1.30469 7.60156H14.5859L9.39062 2.64062C9 2.28906 9 1.66406 9.35156 1.3125C9.70312 0.921875 10.2891 0.921875 10.6797 1.27344Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageTwo = ({ setPage }: { setPage: any }) => {
  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="font-semibold text-[22px]">Guideline (2/2)</p>
        <div>
          <img
            src={"/images/voting/tut-content2.png"}
            alt={"tut-content2"}
            className="h-[197px] w-full object-contain dark:bg-white"
          />
        </div>
        <div className="text-center text-xs mt-2">
          When time is up, the CMs with the <b>highest</b> (1st) and{" "}
          <b>lowest </b>
          (5th) scores are the <b>winners</b>
        </div>
        <div className="w-full">
          <svg
            width="100%"
            height="2"
            viewBox="0 0 339 2"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H339" stroke="#4D7F0C" stroke-dasharray="6 6" />
          </svg>
        </div>
        <div>
          <img
            src={"/images/voting/tut-content3.png"}
            alt={"tut-content3"}
            className="h-[250px] w-full object-contain dark:bg-white"
          />
        </div>
        <div className="text-center text-xs mt-2">
          Players who voted for the <b>winners</b> receive rewards based on
          their <b>vote power</b>
        </div>
        <div
          onClick={() => setPage(0)}
          className="flex w-full items-center gap-2 justify-start cursor-pointer"
        >
          <div className="dark:hidden">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.6875 15.7266L0.812501 9.16406C0.617189 8.96875 0.500001 8.73437 0.500001 8.46094C0.500001 8.22656 0.617189 7.99219 0.812501 7.79687L7.6875 1.23437C8.03906 0.882812 8.66406 0.882812 9.01563 1.27344C9.36719 1.625 9.36719 2.25 8.97656 2.60156L3.78125 7.52344L17.0625 7.52344C17.6094 7.52344 18 7.95312 18 8.46094C18 9.00781 17.6094 9.39844 17.0625 9.39844L3.78125 9.39844L8.97656 14.3594C9.36719 14.7109 9.36719 15.3359 9.01563 15.6875C8.66406 16.0781 8.07813 16.0781 7.6875 15.7266Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="hidden dark:block">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.6875 15.7266L0.812501 9.16406C0.617189 8.96875 0.500001 8.73437 0.500001 8.46094C0.500001 8.22656 0.617189 7.99219 0.812501 7.79687L7.6875 1.23437C8.03906 0.882812 8.66406 0.882812 9.01563 1.27344C9.36719 1.625 9.36719 2.25 8.97656 2.60156L3.78125 7.52344L17.0625 7.52344C17.6094 7.52344 18 7.95312 18 8.46094C18 9.00781 17.6094 9.39844 17.0625 9.39844L3.78125 9.39844L8.97656 14.3594C9.36719 14.7109 9.36719 15.3359 9.01563 15.6875C8.66406 16.0781 8.07813 16.0781 7.6875 15.7266Z"
                fill="white"
              />
            </svg>
          </div>
          <p className="text-[18px]">Previous</p>
        </div>
      </div>
    </div>
  );
};

const Tutorial = () => {
  const navigate = useNavigate();
  const tele = window.Telegram.WebApp;
  tele.BackButton.onClick(() => handleBackBtn());
  const handleBackBtn = () => {
    navigate(navPaths.VOTING);
  };

  const [page, setPage] = useState<number>(0);
  return (
    <div className="pt-5 pb-7 bg-[#F2FFE0] dark:text-white dark:bg-transparent h-screen px-4 overflow-y-scroll relative z-10">
      {page === 0 && <PageOne setPage={setPage} />}
      {page === 1 && <PageTwo setPage={setPage} />}
    </div>
  );
};

export default Tutorial;
