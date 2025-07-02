import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1B3A4B" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
          
        >
          Teacher Dashboard
        </Typography>

        {/* Home Button - Now placed alongside other navigation items */}
        <Button color="inherit" onClick={() => navigate("/dashboard")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate("/add-question")}>
          Add Question
        </Button>
        <Button color="inherit" onClick={() => navigate("/add-pattern")}>
          Add Pattern
        </Button>
        <Button color="inherit" onClick={() => navigate("/generate-paper")}>
          Generate Paper
        </Button>
        <Button color="inherit" onClick={() => navigate("/logout")}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
