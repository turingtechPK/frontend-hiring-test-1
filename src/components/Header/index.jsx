import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import Logo from "../../assets/images/TT Logo.png";
import { TokenContext } from "../../context/tokenContext";
import { useContext } from "react";
import CustomBtn from "../CustomBtn";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <Flex padding="10px" width="full" position="sticky">
      <Flex
        border="1px solid #d8dadd"
        width="full"
        padding="25px"
        justifyContent="space-between"
      >
        <Image src={Logo} alt="TT Logo" width="300px" height="40px" />
        {token && (
          <CustomBtn
            text="Log out"
            color="#4f46f8"
            width="120px"
            fontSize="16px"
            onClick={handleLogout}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
