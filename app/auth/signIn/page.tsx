"use client";
import { Box, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { GoPerson } from "react-icons/go";
import { MdOutlineLock } from "react-icons/md";
import React, { useRef } from "react";
import {signIn} from "next-auth/react";

const SignPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async() =>{
    const result = await signIn("credentials",{
        username: userName.current,
        password: pass.current,
        redirect: true,
        callbackUrl:"/",
    });
  }

  return (
    <Box style={{background:"#f3e5f5"}} height="74.5vh" paddingTop="6rem">
    <Box display={"flex"} style={{background:"white", borderRadius:"4px"}} width="335px" marginX="auto" paddingTop="50px" paddingBottom="50px" paddingLeft="10px">
    <Stack>
        <TextField
          style={{ fontSize: "13px", marginBottom: "30px"}}
          label="Username"
          type="text"
          placeholder="Email"
          id="outlined-start-adornment"
          sx={{ width: '40ch' }}
          onChange={(e)=>(userName.current = e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GoPerson style={{ color: "black" }}/>
              </InputAdornment>
            ),
          }}
        />

        <TextField
        style={{ fontSize: "13px", marginBottom: "20px" }}
          label="Password"
          type="password"
          required
          placeholder="Password"
          id="outlined-start-adornment"
          sx={{ width: '40ch' }}
          onChange={(e)=>(pass.current = e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                 <MdOutlineLock style={{ color: "black" }}/>
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={onSubmit}
          style={{
            backgroundColor: "#0288d1",
            color: "white",
            fontSize: "14px",
            width: "90px",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Log in
        </Button>
    </Stack>
    </Box>
    </Box>
  );
};

export default SignPage;
