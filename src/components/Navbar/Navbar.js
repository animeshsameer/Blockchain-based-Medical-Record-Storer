import React from "react";
import "./navbar.css";
import healthReport from "../../assets/health-report.png";
import { loadAccount } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import Blockies from "react-blockies";
import config from "../../config.json";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);
  const chainId = useSelector((state) => state.provider.chainId);

  const connectHandler = async (e) => {
    await loadAccount(provider, dispatch);
  };

  const networkHandler = async (e) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.target.value }],
    });
  };

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const handleIconClick = () => {
    navigate('/'); // Redirect to the home page (root path)
  };

  return (
    <div className="Navbar">
      <div className="nav__name" onClick={handleIconClick} style={{ cursor: 'pointer' }}>
      <img src={healthReport} alt="Secure Health App Icon" width="40" height="40" />
      <h2>Secure Health</h2>
    </div>

      <div className="nav__networkSelector">
        <select
          name="network"
          id="network"
          onChange={networkHandler}
          value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
        >
          <option value="0" disabled>Select Network</option>
          <option value="31337">Localhost</option>
          <option value="0x5">Goerli</option>
          <option value="0x13881">Mumbai</option>
        </select>
      </div>

      <div className="nav__balance">
        {balance ? (
          <p className="nav__myBalance"><small>My Balance:</small> {Number(balance).toFixed(4)}</p>
        ) : (
          <p className="nav__myBalance"><small>My Balance:</small> 0 ETH</p>
        )}

        {account ? (
          <a className="nav__myAccount" href="/">
            {account.slice(0, 5) + "...." + account.slice(38, 42)}
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="#2187D0"
              bgColor="#F1F2F9"
              spotColor="#767F92"
              className="identicon"
            />
          </a>
        ) : (
          <button className="nav__balance-box" onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>

      {/* ✅ New Auth Buttons Section */}
      <div className="nav__auth">
  {!token ? (
    <>
      <Link to="/" className="nav__link">Home</Link> {/* 🏠 Home link for unauthenticated users */}
      <Link to="/login" className="nav__link">Login</Link>
      <Link to="/signup" className="nav__link">Signup</Link>
    </>
  ) : (
    <>
      <Link to="/" className="nav__link">Home</Link> {/* 🏠 Home link for authenticated users */}
      <Link to="/form" className="nav__link">Form</Link>
      <Link to="/data" className="nav__link">Data</Link>
      <button onClick={handleLogout} className="nav__logout">Logout</button>
    </>
  )}
</div>

    </div>
  );
};

export default Navbar;
