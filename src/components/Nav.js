import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg'; // Ajusta la ruta según la ubicación del componente

const Nav = () => {
   return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="#schedule">
                Schedule
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   );
 };
 
 export default Nav;