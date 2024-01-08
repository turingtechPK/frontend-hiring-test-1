import { Button } from "@mui/material";

import { stylesMui } from "./styles";

interface LoginButtonProps {
  onClick: (event: React.FormEvent) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <Button sx={stylesMui.loginButton} onClick={onClick} type="submit">
      Log in
    </Button>
  );
};

export default LoginButton;
