// src/App.js
import { Route, Routes } from "react-router-dom";
import "../App.css";
import Data from "./Data/Data";
import Form from "./Form/Form";
import Navbar from "./Navbar/Navbar";
import Option from "./Option/Option";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAccount, loadAllData, loadMedical, loadNetwork, loadProvider, subscribeToEvents } from "../store/interactions";
import config from "../config.json";
import Alert from "./Alert/Alert";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../auth/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    if (!(chainId in config)) {
      console.error(`No configuration found for chainId ${chainId}`);
      return;
    }

    const medical_config = config[chainId].medical;
    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch);
    });
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    const medical = loadMedical(provider, medical_config.address, dispatch);
    loadAllData(provider, medical, dispatch);
    subscribeToEvents(medical, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <div className="navbar">
          <Navbar />
          <Option />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/form"
              element={
                <PrivateRoute>
                  <Form />
                </PrivateRoute>
              }
            />
            <Route
              path="/data"
              element={
                <PrivateRoute>
                  <Data />
                </PrivateRoute>
              }
            />
          </Routes>
          <Alert />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
