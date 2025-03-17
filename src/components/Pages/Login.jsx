import React, { useState } from "react";
import config from "../../config";
import {  Container,  Typography,  TextField,  Button,  Grid,  Link,  Box,  CssBaseline,  Paper, CircularProgress,  Alert, } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../FlashMessage/FlashMessage";

const theme = createTheme({
  palette: {
    primary: { main: "#FFD700" }, // Gold/yellow
    secondary: { main: "#000000" }, // Black
    background: { default: "#FFF8E1" }, // Light yellow
  },
});

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [flash, setFlash] = useState(null);
    const showMessage = (message, type) => {
      setFlash({ message, type });
    };
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // **LOGIN API CALL**
        const response = await axios.post(`${config.API_BASE_URL}/user/login/`, {
          email: formData.email,
          password: formData.password,
        });

        // console.log("Login success:", response.data);
        localStorage.setItem("access_token", response.data.access); // Store token in local storage
        showMessage("Login successful! Redirecting to Landing Page...", "success");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.error || "Something went wrong.");
      showMessage(err.response?.data?.error || "Something went wrong.", "failure");
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash(null)}
        />
      )}
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "background.default",
          }}
        >
          <Typography component="h1" variant="h5">
            {isLogin ? "Login" : "Sign Up"}
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              {!isLogin && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="secondary" /> : isLogin ? "Login" : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
