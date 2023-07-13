import logo from "../..//assets/Logo.png";
import Image from "next/image";
import { clear } from "../../utils/utils";
import { useEffect, useState } from "react";
const ACCESS_TOKEN_KEY = "access_token";
export default function Navbar() {
  const [Login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      setLogin(true);
    }
  }, []);
  return (
    <nav className="header">
      <div className="container-fluid">
        <a className="navbar-brand">
          <Image src={logo} alt="Logo" height={25} width={300} />
        </a>
      </div>
      {Login ? (
        <button
          type="button"
          className="btn btn-note"
          style={{ borderRadius: "5px", marginRight: "3rem" }}
          onClick={clear}
        >
          Logout
        </button>
      ) : null}
    </nav>
  );
}
