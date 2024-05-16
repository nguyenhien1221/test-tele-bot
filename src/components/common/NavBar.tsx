import { Slide, ToastContainer, toast } from "react-toastify";
import { navbarItems } from "../../constants/navbar.constants";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const NavBar = () => {
  const navigate = useNavigate();

  const handleShowToast = (index: number, item: any) => {
    if (index === 3) {
      toast.info("Coming soon", {
        autoClose: 2000,
        style: { maxWidth: 337, height: 40, borderRadius: 8 },
        progressStyle: {
          backgroundColor: "#FF8C21",
        },
        icon: <img src="/images/icons/clock.png" alt=""></img>,
      });
    } else {
      navigate(item.path);
      return;
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-left"
        closeOnClick
        transition={Slide}
        hideProgressBar
        limit={1}
        stacked
        className="top-3 max-w-[337px] left-[50%] -translate-x-[50%]"
      />
      <div className="">
        <div className={clsx("grid grid-cols-4 gap-2 ")}>
          {navbarItems.map((item, index) => (
            <div className="grid-cols-1" key={index}>
              <div
                className={clsx(
                  "btn-hover cursor-pointer w-full h-full p-[9px] rounded-[16px] bg-[#fff] drop-shadow-[0_3px_0px_#4D7F0C]",
                  "dark:gradient-border-mask dark:bg-transparent dark:drop-shadow-none"
                )}
                onClick={() => handleShowToast(index, item)}
              >
                <div className="flex flex-col items-center">
                  <div className="h-[36px] ">
                    <img
                      className="h-[36px]"
                      width={index === 2 ? 43 : 36}
                      height={36}
                      src={item.icon}
                      alt={item.name}
                    ></img>
                  </div>
                  <p className="dark:text-white text-xs font-medium">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
