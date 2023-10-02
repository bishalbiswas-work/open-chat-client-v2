import React from "react";

// Appbar Imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
// End Appbar

const Appbar1 = () => {
  const navigate = useNavigate();
  const handleNextPage = () => {
    navigate("/auth");
  };

  

  return (
    <header className="header">
      <div className="header-box">
        <div>
          <a href="/">
          <img src="/logo.png" alt="logo" />
          </a>
        </div>
        <div>
          <h6 className="header-menu"><a style={{ cursor: 'pointer', color: 'black'}}  href="#how">How it works</a></h6>
        </div>
        <div className="button-box">
          <button onClick={handleNextPage} className="button-white">Sign Up</button>
          <button onClick={handleNextPage} className="button-primary">Log In</button>
        </div>
      </div>
    </header>
  );
};

export default Appbar1;
