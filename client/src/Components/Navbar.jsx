import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth ?? { loggedIn: false, user: null });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // Auto-close on desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="nav-container">
      <div className="nav-inner">
        <h1 className="logo">Blogi</h1>

        {isMobile && (
          <div className="menu-icon" onClick={toggleMenu}>
            {menuOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
          </div>
        )}

        <nav>
          <ul className={`nav ${isMobile ? (menuOpen ? "nav-open" : "nav-closed") : ""}`}>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            {loggedIn ? (
              <li className="user-info">
                <span className="welcome-text">Welcome back <strong>{user.email}</strong></span>
                <Link to="/logout" onClick={() => setMenuOpen(false)} className="logout-link">Logout</Link>
              </li>
            ) : (
              <li><Link to="/login" onClick={() => setMenuOpen(false)} className="nav-login-btn">Register</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
