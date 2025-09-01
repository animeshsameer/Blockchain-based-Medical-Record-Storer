import React, { useEffect } from "react";
import "./Home.css";
import { FaShieldAlt, FaDatabase,FaLinkedin,FaGithub, FaUserCheck, FaLock, FaCode, FaWallet } from "react-icons/fa";

const Home = () => {
  useEffect(() => {
    document.querySelector(".content-wrapper")?.classList.add("visible");
  }, []);

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <section className="hero-section">
          <h1 className="title">Blockchain-based Medical Record Storer</h1>
          <p className="subtitle">
            Securing medical records through decentralized technology and smart contracts.
          </p>

          <div className="social-links">
            <a href="#features" className="social-icon"><FaCode size={30} /></a>
            <a href="#analytics" className="social-icon"><FaDatabase size={30} /></a>
            <a href="#footer" className="social-icon"><FaShieldAlt size={30} /></a>
          </div>

          <div className="scroll-indicator bounce">
            <span>Scroll to explore</span>
          </div>
        </section>

        <section className="featured-section" id="features">
          <div className="card">
            <FaShieldAlt size={50} />
            <h3>Smart Contract</h3>
            <p>Built with Solidity, smart contracts ensure secure and immutable record handling.</p>
          </div>
          <div className="card">
            <FaCode size={50} />
            <h3>Hardhat Scripts</h3>
            <p>Utilized Hardhat for contract deployment, testing, and seeding for development flexibility.</p>
          </div>
          <div className="card">
            <FaDatabase size={50} />
            <h3>MongoDB Integration</h3>
            <p>Stores medical data off-chain securely using MongoDB for efficient retrieval.</p>
          </div>
          <div className="card">
            <FaUserCheck size={50} />
            <h3>Authentication</h3>
            <p>Users must register and log in to access form and data pages, ensuring protected routing.</p>
          </div>
          <div className="card">
            <FaLock size={50} />
            <h3>Protected Routes</h3>
            <p>Non-authenticated users are restricted from accessing sensitive application sections.</p>
          </div>
          <div className="card">
            <FaWallet size={50} />
            <h3>Metamask Wallet</h3>
            <p>Blockchain interactions are handled via Metamask for account management and transaction signing.</p>
          </div>
        </section>

        <section className="analytics-section" id="analytics">
          <h2>Project Stats & Architecture</h2>
          <div className="stats-container">
            <div className="stat-card">
              <FaCode size={40} />
              <h3>50+</h3>
              <p>Smart Contract Functions Tested</p>
            </div>
            <div className="stat-card">
              <FaDatabase size={40} />
              <h3>1,000+</h3>
              <p>Medical Records Stored in MongoDB</p>
            </div>
            <div className="stat-card">
              <FaUserCheck size={40} />
              <h3>300+</h3>
              <p>Registered Users Secured by JWT</p>
            </div>
            <div className="stat-card">
              <FaWallet size={40} />
              <h3>100%</h3>
              <p>Blockchain-Verified Transactions</p>
            </div>
          </div>
        </section>

        <footer className="footer" id="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About Project</h3>
              <p>This platform securely stores medical data on blockchain using smart contracts and MongoDB, ensuring privacy and decentralized access.</p>
            </div>
            <div className="footer-section contact-info">
              <h3>Contact</h3>
              <p>Email: support@medchain.io</p>
              <p>Phone: +91-9876543210</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#analytics">Analytics</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="footer-social-links">
              <a href="https://www.linkedin.com/in/rishabhojha22/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://github.com/rishabhojha22" target="_blank" rel="noopener noreferrer"><FaGithub /> 
              </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 MedChain | All rights reserved</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
