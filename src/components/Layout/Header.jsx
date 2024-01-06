import  AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import  Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Logo from "../../assets/logo/TTLogo.png";
import { FlexBetween } from "../Flex/Flex";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useSelector(state => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    window.location.reload()
  }
  return (
   <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{bgcolor:"#fff", boxShadow:"0px 0px 5px #ccc "}}>
        <Toolbar>
          <FlexBetween width="100%">
            <img src={Logo} alt="logo" style={{ height: "35px" }} />
            {isAuthenticated && <Button variant="contained" onClick={logoutHandler}>Log out</Button>}
          
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header