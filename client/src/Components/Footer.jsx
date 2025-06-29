import React from "react";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "../App.css"; // For any global styles
import profileImg from "../assets/mv7ve1lb.png";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* Developer Info */}
        <div style={styles.section}>
          <img src={profileImg} alt="Tripti" style={styles.avatar} />
          <h2 style={styles.name}>Tripti</h2>
          <p style={styles.subtext}>HOPE YOU LIKE IT ❤️🚀</p>
          <div style={styles.socialIcons}>
            <a href="https://www.linkedin.com/in/triptiverma310/" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/Triptiverma003" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.instagram.com/tulipstripti/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.column}>
          <h4>Links</h4>
          <p>Homepage</p>
          <p>Contact</p>
        </div>

        {/* Tags */}
        <div style={styles.column}>
          <h4>Tags</h4>
          <p>Style</p>
          <p>Fashion</p>
          <p>Coding</p>
          <p>Travel</p>
        </div>

        {/* Social */}
        <div style={styles.column}>
          <h4>Connect</h4>
          <p><a href="https://www.linkedin.com/in/triptiverma310/" target="_blank" rel="noreferrer">LinkedIn</a></p>
          <p><a href="https://github.com/Triptiverma003" target="_blank" rel="noreferrer">GitHub</a></p>
          <p><a href="https://www.instagram.com/tulipstripti/" target="_blank" rel="noreferrer">Instagram</a></p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#fff",
    padding: "2rem 1rem",
    borderTop: "1px solid #eee",
    marginTop: "3rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "2rem",
  },
  section: {
    flex: "1 1 200px",
    textAlign: "center",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    fontWeight: "600",
    margin: "0.5rem 0",
  },
  subtext: {
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    fontSize: "1.2rem",
  },
  column: {
    flex: "1 1 150px",
    color: "#444",
  },
};

export default Footer;
