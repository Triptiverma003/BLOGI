import React from "react";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "../App.css";
import profileImg from "../assets/mv7ve1lb.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Developer Info */}
        <div className="footer-section">
          <img src={profileImg} alt="Tripti" className="footer-avatar" />
          <h2 className="footer-name">Tripti</h2>
          <p className="footer-subtext">HOPE YOU LIKE IT ❤️🚀</p>
          <div className="footer-social-icons">
            <a href="https://www.linkedin.com/in/triptiverma310/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
            <a href="https://github.com/Triptiverma003" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://www.instagram.com/tulipstripti/" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-column">
          <h4>Links</h4>
          <p><a href="/">Homepage</a></p>
          <p><a href="/contact">Contact</a></p>
        </div>

        {/* Social */}
        <div className="footer-column">
          <h4>Connect</h4>
          <p><a href="https://www.linkedin.com/in/triptiverma310/" target="_blank" rel="noreferrer">LinkedIn</a></p>
          <p><a href="https://github.com/Triptiverma003" target="_blank" rel="noreferrer">GitHub</a></p>
          <p><a href="https://www.instagram.com/tulipstripti/" target="_blank" rel="noreferrer">Instagram</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
