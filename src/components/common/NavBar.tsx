import React from "react";
import { navbarItems } from "../../constants/navbar.constants";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="flex justify-around bg-[#fff] shadow-lg rounded-[50px] py-[9px] px-[37px]">
        {navbarItems.map((item, index) => (
          <div key={index}>
            <Link to={item.path}>
              <div className="flex flex-col items-center">
                <div className="h-[36px] ">
                  <img
                    width={36}
                    height={36}
                    src={item.icon}
                    alt={item.name}
                  ></img>
                </div>
                <p className="text-xs font-medium">{item.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
