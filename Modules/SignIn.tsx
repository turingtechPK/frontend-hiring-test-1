// import "../styles/Login.module.css"
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import {Input} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import loader from "../../resources/design-images/loader.gif";

import styles from "../styles/login.module.css";
import URLs from "../config.json";

import { useRouter } from "next/router";
import axios from "axios";
const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (username: string, password: string) => {
    await axios.post(URLs.nextLogin,{username,password}).then((res)=>{
      router.push("calls/");
      setCookie('access_token',res.data.access_token)
    })
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.labelRow}> User Name</div>
          <div className={styles.inputRow}>
          <Input placeholder="Username" prefix={<UserOutlined />} onChange={(e) => {
                setUsername(e.target.value);
              }}/>
      
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.labelRow}>Password</div>
          <div className={styles.inputRow}>
          <Input placeholder="Password" onChange={(e) => {
                setPassword(e.target.value);
              }}/>
           
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
      </div>
    </div>
  );
};

export default SignIn;
