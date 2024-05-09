import { ToastContainer, toast } from "react-toastify";
import { navbarItems } from "../../constants/navbar.constants";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const NavBar = () => {
  const navigate = useNavigate();

  const handleShowToast = (index: number, item: any) => {
    if (index === 3) {
      toast.info("Coming soon", {
        autoClose: 2000,
        position: "top-center",
        style: { width: 237, borderRadius: 8 },
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
        hideProgressBar
        limit={1}
        stacked
        className="top-3 w-[237px] left-[50%] -translate-x-[50%]"
      />
      <div className="rounded-[50px] ">
        <div
          className={clsx(
            "flex justify-between dark:gradient-border-mask dark:bg-transparent bg-[#fff] shadow-lg rounded-[50px] py-[9px] px-[37px]"
          )}
        >
          {navbarItems.map((item, index) => (
            <div key={index}>
              <div
                className="cursor-pointer"
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
