import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Switch } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
    const handleToggle = () => {
      setDarkMode(!darkMode);
    };

  return (
    <AppBar position="static" sx={{ mb: 5, backgroundColor: darkMode ? "#333" : "#1E88E5" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🚗 Car Finder
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/wishlist">
          Wishlist 🧡
        </Button>
        <Switch checked={darkMode} onChange={handleToggle} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
