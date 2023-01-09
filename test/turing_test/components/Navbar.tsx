import * as React from 'react';
import logo from '../assets/Logo.png'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand">
        <Image src={logo} alt="Logo" height={25} width={300}/>
        </a>
        
      </div>
    </nav>
  );
}
