import React from "react";
import { HeaderButton } from "../Buttons";
import Logo from "../../assets/Images/TTLogo.png";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <div className="p-6 w-full flex justify-between border-b border-gray-300">
      <img src={Logo} alt="Turing Technologies" width={450} height={50} />
      {isLoggedIn && <HeaderButton />}
    </div>
  );
};

export default Header;
