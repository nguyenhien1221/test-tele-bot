import { navbarItems } from "../../constants/navbar.constants";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Slide, ToastContainer } from "react-toastify";

interface NavBarPropType {
  hasMission: boolean;
}
const NavBar = ({ hasMission }: NavBarPropType) => {
  const navigate = useNavigate();

  const handleShowToast = (index: number, item: any) => {
    navigate(item.path);
    return;
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
            <div className="grid-cols-1 relative" key={index}>
              {index === 0 && hasMission && (
                <div className="w-[14px] h-[14px] absolute z-10 -right-1">
                  <div className="animate-blink w-full h-full absolute  rounded-[50%] "></div>
                  <div className="w-full h-full bg-[#FFA928] absolute  rounded-[50%] "></div>
                </div>
              )}
              <div
                className={clsx(
                  "btn-hover dark:btn-click cursor-pointer w-full h-full p-[9px] rounded-[16px] bg-[#fff] drop-shadow-[0_3px_0px_#4D7F0C]",
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
