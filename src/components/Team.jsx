import React from "react";
import {
    Typography,
    Container,
    Grid,
    Card,
    CardMedia,
  } from "@mui/material";
  

// Team Section Component
const Team = () => {
    const teamMembers = [
      {
        name: "John Doe",
        role: "CEO",
        image: "https://via.placeholder.com/200", // Replace with your image
      },
      {
        name: "Jane Smith",
        role: "CTO",
        image: "https://via.placeholder.com/200", // Replace with your image
      },
      {
        name: "Alice Johnson",
        role: "Lead Developer",
        image: "https://via.placeholder.com/200", // Replace with your image
      },
    ];
  
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", p: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={member.image}
                  alt={member.name}
                  sx={{ borderRadius: "50%", width: 200, height: 200, margin: "auto", mb: 2 }}
                />
                <Typography variant="h6" component="h3" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };

export default Team;