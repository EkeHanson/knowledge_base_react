import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import HeroSection from "../HeroSection";
import Testimonials from "../Testimonials";
import Blog from "../Blog";
import Team from "../Team";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  CssBaseline,
  CardMedia,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom yellow theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD700", // Gold/yellow
    },
    secondary: {
      main: "#000000", // Black
    },
    background: {
      default: "#FFF8E1", // Light yellow
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
  },
});

// Featured Content Section Component
const FeaturedContent = ({ posts }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        align="center"
        sx={{ mb: 6 }}
      >
        Featured Content
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {posts.map((post, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {post.title}
                </Typography>
                <Typography>{post.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={post.link}
                  sx={{ fontWeight: 600 }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Home Page Component
const Home = () => {
  const [posts, setPosts] = useState([
    {
      title: "React Best Practices",
      description: "Learn the best practices for building React applications.",
      link: "/post/1",
      image: "https://via.placeholder.com/400x250", // Replace with your image
    },
    {
      title: "DevOps Pipeline Setup",
      description: "Step-by-step guide to setting up a CI/CD pipeline.",
      link: "/post/2",
      image: "https://via.placeholder.com/400x250", // Replace with your image
    },
    {
      title: "JavaScript Performance Tips",
      description: "Optimize your JavaScript code for better performance.",
      link: "/post/3",
      image: "https://via.placeholder.com/400x250", // Replace with your image
    },
  ]);

  const handleSearch = ({ query, category }) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) &&
        (category ? post.category === category : true)
    );
    setPosts(filteredPosts);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Navbar /> */}
      <HeroSection />
      <Box sx={{ mt: 4 }}> {/* Add margin-top to position the SearchBar correctly */}
        <SearchBar onSearch={handleSearch} />
      </Box>
      <FeaturedContent posts={posts} />
      <Testimonials />
      <Team />
      <Blog />
      <Footer />
    </ThemeProvider>
  );
};

export default Home;