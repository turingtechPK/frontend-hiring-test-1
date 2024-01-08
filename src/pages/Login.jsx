import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import useMediaQuery from "@mui/material/useMediaQuery";
import LockOutlined from "@mui/icons-material/LockOutlined"
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined"
import InputField from "../components/UI/InputField/InputField"
import Header from "../components/Layout/Header"
import { FlexCenter, FlexTextColumn } from "../components/Flex/Flex"
import Spinner from "../components/UI/Spinner/Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../config";
const BASE_URL = config.BACKEND_BASE_URL;

const Login = () => {
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true)
    const payload = { username, password };
    try {
      const expires_in = 2 * 60; 
      const response = await axios.post(`${BASE_URL}/auth/login`, payload);
      const { data } = response;
      if (!(data)) {
        toast.error("Failed to login the user");
        return;
      }
      setLoginLoading(false)
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("exp_time", Date.now() + expires_in * 1000);
      toast.success(`login successfully`)
      window.location.reload()
    } catch (error) {
      console.log("Error in Login:", error.response.data);
      toast.error(`${error.response.data.message}`)
    }
  }
  return (
    <>
      <Header />
      {loginLoading ? <Spinner /> :
        <FlexCenter padding={5} height={'89vh'}>
          <Box
            boxShadow={"0px 0px 5px #ccc"}
            width={isSmallScreen ? "100%" : "50%"}
            padding={3}>

            <form onSubmit={handleSubmit}>
              <FlexTextColumn gap={2}>
                <InputField
                  label="*Username"
                  fullWidth
                  required
                  size="small"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  startAdornment={<PersonOutlineOutlined />}
                />
                <InputField
                  label="*Password"
                  type="password"
                  required
                  fullWidth
                  size="small"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  startAdornment={<LockOutlined />}
                />
              </FlexTextColumn>
              <Box width={100} marginTop={2}>
                <Button type="submit" variant="contained" width={100}>Login</Button>
              </Box>
            </form>
          </Box>
        </FlexCenter>
      }

    </>
  )
}

export default Login