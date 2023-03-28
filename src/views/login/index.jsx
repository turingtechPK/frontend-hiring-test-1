import React from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  chakra,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { TokenContext } from "../../context/tokenContext";
import { useContext } from "react";
import { useState } from "react";
import { API_URL } from "../../config";
import { usePostAPI } from "../../hooks/usePostAPI.JS";
import { useNavigate } from "react-router-dom";
import { CustomBtn } from "../../components";
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
      height="screen"
      justifyContent="center"
      alignItems="center"
      paddingTop="70px"
    >
      <Box paddingX="20px" paddingY="40px" border="1px solid #d8dadd">
        <Text fontSize="16px" marginBottom="10px">
          <span style={{ color: "red" }}>*</span> Username
        </Text>
        <InputGroup marginBottom="20px">
          <InputLeftElement
            children={<ChakraIcon icon="ant-design:user-outlined" />}
          />
          <Input
            placeholder="Username"
            focusBorderColor="#1b1c1e"
            borderRadius="2px"
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
            focusBorderColor="#1b1c1e"
            borderRadius="2px"
            width="400px"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputGroup>

        <CustomBtn
          text="Log in"
          color="#1a90ff"
          width="80px"
          marginTop="30px"
          fontSize="16px"
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
}

export default Login;
