import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import TTLogo from './assets/tt-logo.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <div className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <img className="custom-logo-width" src={TTLogo} alt="Turing Technologies"/>
                </div>
                <div className='d-flex justify-content-end'>
                  <Link to='/'>
                  <button className='btn btn-primary color-purple'>Logout</button>
                  </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header