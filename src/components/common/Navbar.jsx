import { Toolbar, Button } from "@mui/material";
import { AppBarStyles, BoxStyles, LogoStyles } from "../../styles/NavBarStyles";

const NavBar = () => {
  return (
    <AppBarStyles>
      <Toolbar>
        <BoxStyles>
          <LogoStyles to="/login">
            <img src="/src/assets/tt-logo.png" />
          </LogoStyles>
        </BoxStyles>
        <Button variant="contained">Logout</Button>
      </Toolbar>
    </AppBarStyles>
  );
};

export default NavBar;
