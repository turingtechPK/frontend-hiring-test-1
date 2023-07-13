import * as React from "react";
import logo from "../..//assets/Logo.png";
import Image from "next/image";

export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <nav className="header">
      <div className="container-fluid">
        <a className="navbar-brand">
          <Image src={logo} alt="Logo" height={25} width={300} />
        </a>
      </div>
      <button
        type="button"
        className="btn btn-note"
        style={{ borderRadius: "5px", marginRight: "3rem" }}
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}
