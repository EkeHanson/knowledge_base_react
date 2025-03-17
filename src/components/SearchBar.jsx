import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Box, CircularProgress } from "@mui/material";
import config from "../config";
import axios from "axios"; // Import axios for API requests

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [loading, setLoading] = useState(false); // Loading state for fetching categories
  const [nextPage, setNextPage] = useState(null); // Track the next page URL for pagination

  // Fetch categories from the API
  const fetchCategories = async (url) => {
    setLoading(true); // Show loading state
    try {
      const response = await axios.get(url || `${config.API_BASE_URL}/knowledge/categories/`);
      setCategories((prevCategories) => [...prevCategories, ...response.data.results]); // Append new categories
      setNextPage(response.data.next); // Update the next page URL
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    onSearch({ query, category });
  };

  // Handle loading more categories (pagination)
  const handleLoadMoreCategories = () => {
    if (nextPage) {
      fetchCategories(nextPage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        p: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: 800,
        margin: "auto",
        mt: 4, // Add margin-top to position it below the HeroSection
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ flex: 2 }}
      />
      <TextField
        select
        fullWidth
        variant="outlined"
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ flex: 1 }}
      >
        {/* Render categories as MenuItem options */}
        {categories.map((cat) => (
          // <MenuItem key={cat.unique_category_id} value={cat.unique_category_id}>
          <MenuItem key={cat.unique_category_id} value={cat.name}>
            {cat.name}
          </MenuItem>
        ))}
        {/* Show a "Load More" option if there are more categories */}
        {nextPage && (
          <MenuItem disabled={loading} onClick={handleLoadMoreCategories}>
            {loading ? <CircularProgress size={24} /> : "Load More..."}
          </MenuItem>
        )}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ height: 56 }} // Match the height of TextField
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;