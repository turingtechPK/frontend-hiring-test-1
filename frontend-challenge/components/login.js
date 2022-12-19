import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { setCookie } from "cookies-next";
import { useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import { loginAPICall } from "../src/services/api-service";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (username, password) => {
    const response = await loginAPICall({ username, password });
    if(!response.error && response.data){
      setError("")
      console.log("Access : ", response.data.access_token);
      setCookie("auth_token", response.data.access_token);
      router.push("/calls");
    }else{
      setError("Please Enter Valid Email and Password");
    }
  };

  const handleUserNameChange = (e) => {
    setError("")
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setError("")
    setPassword(e.target.value)
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.labelRow}> User Name</div>
          <div className={styles.inputRow}>
            <Input
              placeholder={error ? "Please Enter Valid Username" : "Username"}
              prefix={<UserOutlined />}
              onChange={handleUserNameChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.labelRow}>Password</div>
          <div className={styles.inputRow}>
            <Input
              placeholder={error ? "Please Enter Valid Password" : "Password"}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputRow}></div>
        </div>
        {
          <div
            className={styles.btn}
            onClick={() => {
              handleLogin(username, password);
            }}
          >
            Login
          </div>
        }
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default Login;
