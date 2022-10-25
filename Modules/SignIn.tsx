// import "../styles/Login.module.css"

import { useEffect, useState } from "react";
import loader from "../../resources/design-images/loader.gif";

import styles from "../styles/login.module.css";
import { baseURL, loginURL } from "../config.json";

import { useRouter } from "next/router";
import axios from "axios";
const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (username: string, password: string) => {
    axios
      .post(baseURL + loginURL, { username, password })
      .then((res) => {
        sessionStorage.setItem("access_token", res.data.access_token);
        sessionStorage.setItem("refresh_token", res.data.refresh_token);
        sessionStorage.setItem("token_time", new Date().getTime().toString());
        sessionStorage.setItem("isLoggedIn", "true");
        router.push("calls");
      })
      .catch((e) => {
        sessionStorage.setItem("access_token", "");
        sessionStorage.setItem("refresh_token", "");
        sessionStorage.setItem("isLoggedIn", "false");
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      router.push("/calls");
    }
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.labelRow}> User Name</div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.labelRow}>Password</div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
      </div>
    </div>
  );
};

export default SignIn;
