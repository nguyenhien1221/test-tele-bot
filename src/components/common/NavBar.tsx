import { ToastContainer, toast } from "react-toastify";
import { navbarItems } from "../../constants/navbar.constants";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleShowToast = (index: number, item: any) => {
    if (index === 3) {
      toast.info("Coming soon", {
        autoClose: 2000,
        position: "top-center",
        style: { width: 272, borderRadius: 8 },
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
        limit={1}
        stacked
        className="top-3 w-[272px] left-[50%] -translate-x-[50%]"
      />
      <div className="flex justify-between bg-[#fff] shadow-lg rounded-[50px] py-[9px] px-[37px]">
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
                    width={36}
                    height={36}
                    src={item.icon}
                    alt={item.name}
                  ></img>
                </div>
                <p className="text-xs font-medium">{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
