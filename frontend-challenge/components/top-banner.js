import styles from "../styles/banner.module.css";
import React from "react";
import turingLogo from "../assets/TuringLogo.png";
import { setCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";

function TopBanner({is_landing = false}) {
  const handleLogout = () => {
    setCookie("auth_token", "");
    setCookie("refresh_token", "");
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={turingLogo}
          alt="Turing Technologies"
          width={300}
          height={37}
          priority={true}
        />
      </div>

      {!is_landing ? <div className={styles.LogoutContainer} onClick={handleLogout}>
        <Link href="/">
          <div className={styles.linkBtn}> Log out</div>
        </Link>
      </div>: <></>}
    </div>
  );
}
export default TopBanner;
