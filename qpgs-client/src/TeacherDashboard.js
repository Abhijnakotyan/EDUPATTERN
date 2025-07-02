import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Background Image Container */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: "url('/asset/teacherdashboard.jpg')", // Update image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          p: 4,
        }}
      >
        {/* Title */}
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Automate Question Paper Generation
        </Typography>

        {/* Subtitle */}
        <Typography variant="h6" sx={{ maxWidth: "600px", mb: 4 }}>
          Say goodbye to manual question paper generation! Our AI-powered system streamlines the process, saving time and ensuring efficiency.
        </Typography>

        {/* Generate Paper Button */}
        <Box>
          <Button
            variant="contained"
            color="rgb(86, 80, 80)"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: "1.2rem", fontWeight: "bold" }}
            onClick={() => navigate("/generate-paper")}
          >
            Generate Paper
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default TeacherDashboard;
