import React from "react";
import { Box, Text } from "@chakra-ui/react";

const CustomBtn = ({ text, color, ...props }) => {
  return (
    <Box
      bg={color}
      padding={props.padding ? props.padding : "10px"}
      borderRadius="2px"
      cursor="pointer"
      {...props}
    >
      <Text color="white" textAlign="center" fontSize={props.fontSize}>
        {text}
      </Text>
    </Box>
  );
};

export default CustomBtn;
