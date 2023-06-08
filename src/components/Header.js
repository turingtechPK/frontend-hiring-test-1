import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  Button,
  Text,
  Avatar,
  Heading,
  Spacer,
  HStack,
  AvatarBadge,
} from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex
      as="nav"
      p="10px"
      alignItems="center"
      borderBottom="1 px"
      bg="white"
      borderColor="gray.700"
    >
      <Image w="300px" src="./design-files/TT-Logo.png" alt="logo" />
      <Spacer />
      {user !== null && (
        <HStack spacing="20px">
          <Avatar name={user.user.username}>
            <AvatarBadge bg="teal.500" w="1.2em">
              <Text fontSize="xs" color="white">
                A
              </Text>
            </AvatarBadge>
          </Avatar>
          <Text as="b" fontSize="25px">
            {user.user.username}
          </Text>
          <Button colorScheme="purple" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default Header;
