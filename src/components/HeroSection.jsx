import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    Typography,
    Button,
    Container,
    Box,
  } from "@mui/material";

const  HeroSection = () => {
    return (
      <Box
        sx={{
          backgroundImage: "url('https://via.placeholder.com/1920x600')", // Replace with your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          py: 12,
          textAlign: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay for better text visibility
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Welcome to the Knowledge Base
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
            Centralize knowledge, solutions, and resources for your team.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/create-post"
            sx={{ fontWeight: 600 }}
          >
            Create Post
          </Button>
        </Container>
      </Box>
    );

};

export default HeroSection;