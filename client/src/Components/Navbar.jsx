import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth ?? { loggedIn: false, user: null });

  return (
    <header className="nav-container">
      <div className="nav-inner">
        <h1 className="logo">Blogi</h1>
        <nav>
          <ul className="nav">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">Home</Link></li>
            {loggedIn ? (
              <li className="user-info">
                <span className="welcome-text">Welcome back <strong>{user.email}</strong></span>
                <Link to="/logout" className="logout-link">Logout</Link>
              </li>
            ) : (
              <li><Link to="/login" className="nav-login-btn">Register</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
