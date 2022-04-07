import React from "react";
import Logo from "../../assets/icons/logo.svg";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full mx-auto h-16 bg-dark text-light font-bold shadow-lg z-50">
      <div className="w-11/12 md:w-9/12 mx-auto h-full flex items-center flex items-center">
        <img src={Logo} alt="logo-translate" className="w-8" />
        <span>Translaaate.</span>
      </div>
    </div>
  );
};

export default Navbar;
