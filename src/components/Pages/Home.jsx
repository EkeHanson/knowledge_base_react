import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import HeroSection from "../HeroSection";
import Testimonials from "../Testimonials";
import Blog from "../Blog";
import Team from "../Team";
import config from "../../config";
import axios from "axios"; // Import axios for API requests

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
  CircularProgress, // Add CircularProgress for loading state
  Chip, // Add Chip for category and tags
  IconButton, // Add IconButton for pagination controls
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"; // Add icons for pagination

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
        {posts.map((post, index) => {
          // Extract the first image from the post content
          const imageRegex = /<img[^>]+src="([^">]+)"/;
          const imageMatch = post.content.match(imageRegex);
          const imageSrc = imageMatch ? imageMatch[1] : null;

          // Remove the image from the content
          const contentWithoutImage = post.content.replace(imageRegex, "");

          // Truncate the content to 1000 characters
          const truncatedContent =
            contentWithoutImage.length > 1000
              ? `${contentWithoutImage.substring(0, 2000)} ...`
              : contentWithoutImage;

          return (
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
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Post Title */}
                  <Typography variant="h5" component="h3" gutterBottom>
                    {post.title}
                  </Typography>

                  {/* Post Category and Tags */}
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    {post.category && (
                      <Chip label={post.category.name} color="primary" />
                    )}
                    {post.tags?.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        sx={{ backgroundColor: "#FFD700" }}
                      />
                    ))}
                  </Box>

                  {/* Post Content (Truncated) */}
                  <Box
                    sx={{
                      "& h1": { fontSize: "2rem", fontWeight: "bold", mb: 2 },
                      "& h2": { fontSize: "1.75rem", fontWeight: "bold", mb: 2 },
                      "& h3": { fontSize: "1.5rem", fontWeight: "bold", mb: 2 },
                      "& p": { fontSize: "1rem", lineHeight: 1.6, mb: 2 },
                      "& strong": { fontWeight: "bold" },
                      "& em": { fontStyle: "italic" },
                      "& ul, & ol": { pl: 4, mb: 2 },
                      "& li": { mb: 1 },
                      "& img": {
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        my: 2,
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                  />

                  {/* Display the image after the text */}
                  {imageSrc && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={imageSrc}
                      alt={post.title}
                      sx={{ mt: 2 }} // Add margin-top to separate image from text
                    />
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/post/${post.id}`} // Use post.id for the link
                    sx={{ fontWeight: 600 }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

// Home Page Component
const Home = () => {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  // Fetch posts from the API
  const fetchPosts = async (page = 1) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/knowledge/posts/?page=${page}`);
      setPosts(response.data.results); // Update posts with fetched data
      setTotalPages(Math.ceil(response.data.count / 3)); // Calculate total pages (assuming 10 posts per page)
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // Fetch posts when the component mounts or the page changes
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  // Handle search functionality
  const handleSearch = async ({ query, category }) => {
    setLoading(true); // Show loading state while searching
    try {
      const response = await axios.get(`${config.API_BASE_URL}/knowledge/posts/search/`, {
        params: { q: query, category }, // Pass query and category as params
      });
      setPosts(response.data.results); // Update posts with search results
      setTotalPages(1); // Reset pagination for search results
    } catch (error) {
      console.error("Error searching posts:", error);
      setError("Failed to search posts. Please try again later.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Display loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Display error state
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Navbar /> */}
      <HeroSection />
      <Box sx={{ mt: 4 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <FeaturedContent posts={posts} />
      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
        <IconButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1} // Disable on first page
          sx={{ color: currentPage === 1 ? "grey" : "primary.main" }}
        >
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" sx={{ mx: 2 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages} // Disable on last page
          sx={{ color: currentPage === totalPages ? "grey" : "primary.main" }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
      <Testimonials />
      <Team />
      <Blog />
    </ThemeProvider>
  );
};

export default Home;