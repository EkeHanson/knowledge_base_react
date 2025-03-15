import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import RichTextEditor from "../RichTextEditor";
import axios from "axios";
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
});

const CreatePost = () => {
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  // Categories and tags (can be fetched from the backend or hardcoded)
  const categories = ["Frontend", "Backend", "DevOps", "Database", "Other"];
  const tagSuggestions = ["JavaScript", "React", "Bug Fix", "Performance", "API"];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !content || !category) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // Prepare the post data
      const postData = {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        category,
      };

      // Send the POST request to the backend
      const response = await axios.post("/api/posts", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
        },
      });

      // Redirect to the post detail page after successful creation
      navigate(`/post/${response.data.id}`);
    } catch (err) {
      setError("Failed to create post. Please try again.");
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Post
        </Typography>

        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "background.default" }}>
              <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                {/* Content Field */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Content
                  </Typography>
                  <RichTextEditor value={content} onChange={setContent} />
                </Box>

                {/* Category Field */}
                <TextField
                  select
                  label="Category"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Tags Field */}
                <TextField
                  label="Tags (comma-separated)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  helperText="Example: JavaScript, React, Bug Fix"
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Create Post
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Preview Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "background.default" }}>
              <Typography variant="h5" gutterBottom>
                Post Preview
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Preview Title */}
              <Typography variant="h4" gutterBottom>
                {title || "Your Post Title"}
              </Typography>

              {/* Preview Category and Tags */}
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Chip label={category || "Category"} color="primary" />
                {tags.split(",").map(
                  (tag, index) =>
                    tag.trim() && (
                      <Chip
                        key={index}
                        label={tag.trim()}
                        sx={{ backgroundColor: "#FFD700" }}
                      />
                    )
                )}
              </Box>

              {/* Preview Content */}
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
                  "& img": { maxWidth: "100%", height: "auto", borderRadius: "8px", my: 2 },
                }}
                dangerouslySetInnerHTML={{ __html: content || "Your post content will appear here." }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default CreatePost;