import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Example data for dashboard cards
  const dashboardCards = [
    {
      title: "My Posts",
      description: "View and manage all your posts.",
      link: "/my-posts",
      icon: "📝",
    },
    {
      title: "Create New Post",
      description: "Share your knowledge with the team.",
      link: "/create-post",
      icon: "✍️",
    },
    {
      title: "Profile Settings",
      description: "Update your profile information.",
      link: "/profile",
      icon: "👤",
    },
    {
      title: "Notifications",
      description: "Check your latest notifications.",
      link: "/notifications",
      icon: "🔔",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
        Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {dashboardCards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Avatar sx={{ width: 80, height: 80, fontSize: "2rem", mb: 2 }}>
                {card.icon}
              </Avatar>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={card.link}
                >
                  Go to {card.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; // Ensure this is the default export