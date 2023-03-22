import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import Logo from "../../assets/images/TT Logo.png";

const Header = () => {
  return (
    <Flex padding="10px" width="full" bg="#f5edee">
      <Flex border="1px solid #cacaca" width="full" padding="25px" bg="white">
        <Image src={Logo} alt="TT Logo" width="300px" height="40px" />
      </Flex>
    </Flex>
  );
};

export default Header;
