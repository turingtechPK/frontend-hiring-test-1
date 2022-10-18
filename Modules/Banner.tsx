import { withStyles } from "@mui/styles";
import styles from "../styles/Banner.module";
import React from "react";
import logo from "../resources/TT Logo.png";

import Link from "next/link";
import Image from "next/image";

function Banner(props: any) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Image src={logo} alt="Turing Technologies" width={300} height={40} />
      </div>

      <div
        className={classes.SignoutContainer}
        onClick={() => {
          sessionStorage.setItem("access_token", "");
          sessionStorage.setItem("refresh_token", "");
          sessionStorage.setItem("isLoggedIn", "false");
        }}
      >
        <Link href="/" className={classes.btn}>
          Log out
        </Link>
      </div>
    </div>
  );
}
export default withStyles(styles)(Banner);
