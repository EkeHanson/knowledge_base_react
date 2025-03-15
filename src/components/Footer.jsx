import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  TextField, // Add this import
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

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
});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "secondary.main",
          py: 6,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <List>
                <ListItem>
                  <Link href="/" color="inherit" underline="none">
                    Home
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/about" color="inherit" underline="none">
                    About Us
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/posts" color="inherit" underline="none">
                    Posts
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/contact" color="inherit" underline="none">
                    Contact
                  </Link>
                </ListItem>
              </List>
            </Grid>

            {/* Social Media */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    <Facebook />
                  </ListItemIcon>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                    underline="none"
                  >
                    Facebook
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    <Twitter />
                  </ListItemIcon>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                    underline="none"
                  >
                    Twitter
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    <Instagram />
                  </ListItemIcon>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                    underline="none"
                  >
                    Instagram
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    <LinkedIn />
                  </ListItemIcon>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                    underline="none"
                  >
                    LinkedIn
                  </Link>
                </ListItem>
              </List>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    <Email />
                  </ListItemIcon>
                  <Typography>info@knowledgebase.com</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    <Phone />
                  </ListItemIcon>
                  <Typography>+1 (123) 456-7890</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    <LocationOn />
                  </ListItemIcon>
                  <Typography>
                    123 Knowledge St, Tech City, TC 12345
                  </Typography>
                </ListItem>
              </List>
            </Grid>

            {/* Newsletter */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Subscribe to our newsletter for the latest updates.
              </Typography>
              <Box component="form">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  type="submit"
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ my: 4, backgroundColor: "secondary.main" }} />

          {/* Copyright Notice */}
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Knowledge Base. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;