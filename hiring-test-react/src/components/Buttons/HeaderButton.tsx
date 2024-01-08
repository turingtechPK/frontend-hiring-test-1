import { Button } from "@mui/material";

import { stylesMui } from "./styles";

const HeaderButton = () => {
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.location.reload();
  };
  return (
    <Button sx={stylesMui.headerButton} onClick={handleLogout}>
      Log out
    </Button>
  );
};

export default HeaderButton;
