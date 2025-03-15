import React, { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch({ query, category });
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
        <MenuItem value="Frontend">Frontend</MenuItem>
        <MenuItem value="Backend">Backend</MenuItem>
        <MenuItem value="DevOps">DevOps</MenuItem>
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