import styles from "../styles/Banner.module.css";
import React from "react";
import logo from "../resources/TT Logo.png";

import Link from "next/link";
import Image from "next/image";

function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} alt="Turing Technologies" width={311} height={36.76} />
      </div>

      <div
        className={styles.SignoutContainer}
        onClick={() => {
          sessionStorage.setItem("access_token", "");
          sessionStorage.setItem("refresh_token", "");
          sessionStorage.setItem("isLoggedIn", "false");
        }}
      >
        <Link href="/">
          <div className={styles.btn}> Log out</div>
        </Link>
      </div>
    </div>
  );
}
export default Banner;
