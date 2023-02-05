import {React, useState} from "react";

import Logo from "../../assets/TT Logo.png"

import axios from 'axios';
import "./Navbar.css";


function TuringNav() {


  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light NavStyle">

        <a style={{ cursor: "pointer" }}>
          <img src={Logo} alt="Turing" style={{ width: "200px" }} />
        </a>


        <div
          class=" textPosition bg-light ms-auto ml-auto"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav d-flex align-items-center">

            <li
              class="nav-item navButtonMargin"
              style={{ marginInline: "0.3rem", marginLeft: "0px" }}
            >
              <button className="button-login">
                <a class="nav-link navText p-0" style={{ color: "white" }}  >
                  Log out
                </a>
              </button>
            </li>

          </ul>
        </div>
      </nav>
    </>
  )
}

export default TuringNav;