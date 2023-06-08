import {
  Flex,
  Box,
  Center,
  Spacer,
  FormLabel,
  Input,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import React from "react";

import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const LoginForm = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Box p="20px" boxSizing="border-box" bg="white" h="350px" w="650px">
        <Box p="50px">
          <form onSubmit={handleLogin}>
            <FormControl isRequired>
              <FormLabel required>Username</FormLabel>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={AiOutlineUser} />
                </InputLeftElement>
                <Input
                  type="text"
                  value={username}
                  onChange={handleUsername}
                  placeholder="Username"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={AiOutlineLock} />
                </InputLeftElement>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Password"
                />
              </InputGroup>
            </FormControl>
            <Button color="white" colorScheme="blue" type="submit" mt="10px">
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginForm;
