// import "../styles/Login.module.css"

import { useEffect, useState } from "react";
import loader from "../../resources/design-images/loader.gif";
import { withStyles } from "@mui/styles";
import styles from "../styles/Login.module";
import { baseURL, loginURL } from "../config.json";

import { useRouter } from "next/router";
import axios from "axios";
const SignIn = (props: any) => {
  const { classes } = props;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (username: string, password: string) => {
    axios
      .post(baseURL + loginURL, { username, password })
      .then((res) => {
        sessionStorage.setItem("access_token", res.data.access_token);
        sessionStorage.setItem("refresh_token", res.data.refresh_token);
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
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.labelRow}>User Name</div>
          <div className={classes.inputRow}>
            <input
              className={classes.input}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.labelRow}>Password</div>
          <div className={classes.inputRow}>
            <input
              className={classes.input}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.inputRow}></div>
          {
            <div
              className={classes.btn}
              onClick={() => {
                handleLogin(username, password);
              }}
            >
              Login
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignIn);
