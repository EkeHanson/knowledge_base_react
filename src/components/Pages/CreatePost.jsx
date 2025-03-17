import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import FlashMessage from "../FlashMessage/FlashMessage";
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
  CircularProgress
} from "@mui/material";

import { Autocomplete } from "@mui/material";
import RichTextEditor from "../RichTextEditor";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom yellow theme
const theme = createTheme({
  palette: {
    primary: { main: "#FFD700" }, // Gold/yellow
    secondary: { main: "#000000" }, // Black
    background: { default: "#FFF8E1" }, // Light yellow
  },
});

const CreatePost = () => {
  const navigate = useNavigate();

    const [flash, setFlash] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state
  
    const showMessage = (message, type) => {
      setFlash({ message, type });
    };
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  // State for categories and tags fetched from the backend
  const [categories, setCategories] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);

  // Fetch categories and tags from the API
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          axios.get(`${config.API_BASE_URL}/knowledge/categories/`),
          axios.get(`${config.API_BASE_URL}/knowledge/tags/`),
        ]);
  
        // console.log("categoriesRes.data", categoriesRes.data);
        // console.log("tagsRes.data", tagsRes.data);
  
        setCategories(categoriesRes.data.results); // Set to the results array
        setTagSuggestions(tagsRes.data.results); // Assuming tagsRes.data is an array
      } catch (err) {
        console.error("Error fetching categories or tags:", err);
      }
    };
  
    fetchCategoriesAndTags();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !content || !category) {
        setError("Please fill in all required fields.");
        setIsLoading(false);
        return;
    }

    try {
        const postData = {
            title,
            content,
            tags: selectedTags.map((tag) => tag.unique_tag_id),
            category: category ? category.unique_category_id : null,
        };

        const response = await axios.post(`${config.API_BASE_URL}/knowledge/posts/`, postData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        showMessage("Post created successfully!", "success");
        setIsLoading(false);

        // Reset form fields
        setTitle("");
        setContent("");
        setSelectedTags([]);
        setCategory("");
        setError("");

        // Delay redirect for 2 seconds
        setTimeout(() => {
          navigate(`/post/${response.data.id}`);; // Change to your actual target route  // navigate(`/post/${response.data.id}`); 
        }, 2000);

    } catch (err) {
        setIsLoading(false);
        if (err.response && err.response.data) {
            const errorMessages = Object.values(err.response.data).join("\n");
            setError(errorMessages);
            showMessage(errorMessages, "failure");
        } else {
            setError("Failed to create post. Please try again.");
            showMessage("An unexpected error occurred.", "failure");
        }
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
      {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash(null)}
        />
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
                  value={category ? category.unique_category_id : ""}  // Use unique_category_id for selection
                  onChange={(e) => {
                    const selectedCategory = categories.find(cat => cat.unique_category_id === e.target.value);
                    setCategory(selectedCategory || null);  // Store full category object
                  }}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.unique_category_id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>


                {/* Tags Field */}
                <Autocomplete
                  multiple
                  options={tagSuggestions}
                  getOptionLabel={(option) => option.name}
                  value={selectedTags}
                  onChange={(event, newValue) => setSelectedTags(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" variant="outlined" margin="normal" />
                  )}
                />

                {/* Submit Button */}
                <Button 
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Post"}
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
                {/* <Chip label={category || "Category"} color="primary" /> */}
                <Chip label={category ? category.name : "Category"} color="primary" />

                {selectedTags.map((tag) => (
                  <Chip key={tag.id} label={tag.name} sx={{ backgroundColor: "#FFD700" }} />
                ))}
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
