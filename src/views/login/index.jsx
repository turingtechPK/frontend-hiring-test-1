import React from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  chakra,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { TokenContext } from "../../context/tokenContext";
import { useContext } from "react";
import { useState } from "react";
import { API_URL } from "../../config";
import { usePostAPI } from "../../hooks/usePostAPI.JS";
import { useNavigate } from "react-router-dom";
//factory function
const ChakraIcon = chakra(Icon);

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(TokenContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = {
      username: username,
      password: password,
    };

    const response = await usePostAPI(API_URL.LOGIN, data);
    console.log(response);

    setToken(response.access_token);

    if (response.access_token) {
      navigate("/calls");
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bg="#f5edee"
    >
      <Box bg="white" paddingX="20px" paddingY="40px">
        <Text fontSize="16px" marginBottom="10px">
          <span style={{ color: "red" }}>*</span> Username
        </Text>
        <InputGroup marginBottom="20px">
          <InputLeftElement
            children={<ChakraIcon icon="ant-design:user-outlined" />}
          />
          <Input
            placeholder="Username"
            width="400px"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </InputGroup>
        <Text fontSize="16px" marginBottom="10px">
          <span style={{ color: "red" }}>*</span> Password
        </Text>
        <InputGroup marginBottom="10px">
          <InputLeftElement
            children={<ChakraIcon icon="ant-design:lock-outlined" />}
          />
          <Input
            placeholder="Password"
            width="400px"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputGroup>

        <Button
          colorScheme="blue"
          borderRadius="3px"
          variant="solid"
          width="100px"
          marginTop="20px"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
