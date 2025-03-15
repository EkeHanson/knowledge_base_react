import React from "react";
import {
    Typography,
    Container,
    Grid,
    Card,
    Box,
    Avatar,
  } from "@mui/material";

// Testimonials Section Component
const Testimonials = () => {
    const testimonials = [
      {
        name: "John Doe",
        role: "Software Engineer",
        quote: "The Knowledge Base has been a game-changer for our team. It’s easy to use and has everything we need!",
        avatar: "https://via.placeholder.com/100", // Replace with your image
      },
      {
        name: "Jane Smith",
        role: "DevOps Engineer",
        quote: "I love how organized and searchable everything is. It’s made onboarding new team members so much easier.",
        avatar: "https://via.placeholder.com/100", // Replace with your image
      },
      {
        name: "Alice Johnson",
        role: "Frontend Developer",
        quote: "The Knowledge Base is a must-have for any development team. It’s streamlined our workflow significantly.",
        avatar: "https://via.placeholder.com/100", // Replace with your image
      },
    ];
  
    return (
      <Box sx={{ backgroundColor: "background.default", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Testimonials
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ textAlign: "center", p: 3 }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                  />
                  <Typography variant="h6" component="h3" gutterBottom>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {testimonial.role}
                  </Typography>
                  <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                    "{testimonial.quote}"
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
};

export default Testimonials;