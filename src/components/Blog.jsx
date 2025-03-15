import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Box,
    CardMedia,
  } from "@mui/material";


// Blog Section Component
const Blog = () => {
    const blogPosts = [
      {
        title: "10 Tips for Better Code Reviews",
        description: "Learn how to conduct effective code reviews and improve your team's code quality.",
        link: "/blog/1",
        image: "https://via.placeholder.com/400x250", // Replace with your image
      },
      {
        title: "Introduction to DevOps",
        description: "A beginner's guide to understanding DevOps principles and practices.",
        link: "/blog/2",
        image: "https://via.placeholder.com/400x250", // Replace with your image
      },
      {
        title: "Mastering React Hooks",
        description: "Everything you need to know about React Hooks and how to use them effectively.",
        link: "/blog/3",
        image: "https://via.placeholder.com/400x250", // Replace with your image
      },
    ];
  
    return (
      <Box sx={{ backgroundColor: "background.default", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Blog
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {blogPosts.map((post, index) => (
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
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  };

export default Blog;