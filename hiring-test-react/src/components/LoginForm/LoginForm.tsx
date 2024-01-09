import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { authenticate } from "../../services/apis/api";
import { LoginButton } from "../Buttons";
import InputField from "../InputField";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const authResponse = await authenticate(username, password);
      const { access_token, refresh_token } = authResponse;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center bg-[#F5EEEE] h-screen items-center">
        <form className="w-1/2 xl:h-[60%] 2xl:h-[50%] border-2 p-8 bg-[white] flex flex-col justify-center">
          <InputField
            name="username"
            placeholder="Email"
            type="email"
            fullWidth={true}
            label="User Name"
            onChange={(e) => setUsername(e.target.value)}
            inputAdornment={<PersonOutlineOutlinedIcon />}
          />
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            fullWidth={true}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            inputAdornment={<LockOutlinedIcon />}
          />
          <div className="flex justify-start">
            <LoginButton onClick={handleLogin} />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
