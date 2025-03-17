import React, { useState, useEffect } from "react";
import config from "../../config";
import FlashMessage from "../FlashMessage/FlashMessage";
import {
  Typography, Container, Paper, Box, TextField, Button, List, ListItem, ListItemText, Divider, Avatar, CssBaseline, Chip, CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";

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

const PostDetail = () => {
  const [flash, setFlash] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const showMessage = (message, type) => {
    setFlash({ message, type });
  };

  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [post_unique_id, setPost_unique_id] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch post and comments
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/knowledge/posts/${id}`);
        setPost(response.data);
        setPost_unique_id(response.data.unique_post_id);
        setComments(response.data.comments || []); // Ensure comments is an array
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/knowledge/comments/`,
        {
          post: post_unique_id, // Pass the post ID
          content: newComment, // Pass the comment content
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include auth token if required
          },
        }
      );

      // Add the new comment to the comments list
      setComments([...comments, response.data]);
      setNewComment(""); // Clear the comment input

      showMessage("Comment created successfully!", "success");
    } catch (error) {
      console.error("Error submitting comment:", error);

      // Extract the error message from the response
      let errorMessage = "An error occurred while submitting the comment.";
      if (error.response) {
        // Handle 401 Unauthorized error
        if (error.response.status === 401) {
          errorMessage = "Your session has expired. Please log in again.";
        } else if (error.response.data && error.response.data.detail) {
          // Use the error detail from the backend
          errorMessage = error.response.data.detail;
        } else if (error.response.data && error.response.data.messages) {
          // Use the first error message from the backend
          errorMessage = error.response.data.messages[0].message;
        }
      } else if (error.request) {
        errorMessage = "No response received from the server. Please try again.";
      } else {
        errorMessage = error.message;
      }

      // Display the error message
      showMessage(errorMessage, "failure");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash(null)}
        />
      )}

      <Container sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: "background.default" }}>
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>

          {/* Author and Date */}
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
           Posted By {post?.author?.first_name} {post?.author?.last_name} [{post?.author?.email}] | {new Date(post.created_at).toLocaleDateString()}
          </Typography>

          {/* Category and Tags */}
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {/* Display Category */}
            {post.category && (
              <Chip label={post.category.name} color="primary" />
            )}

            {/* Display Tags */}
            {post.tags?.map((tag) => (
              <Chip key={tag.id} label={tag.name} sx={{ backgroundColor: "#FFD700" }} />
            )) || []}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Content */}
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
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Paper>

        {/* Comments Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <List>
            {comments?.length > 0 ? (
              comments.map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                      {/* Generate initials from first_name and last_name */}
                      {comment.author?.first_name?.charAt(0) || ""}
                      {comment.author?.last_name?.charAt(0) || ""}
                      {/* {comment.author?.email?.charAt(0) || ""} */}
                    </Avatar>
                    <ListItemText
                      primary={`${comment.author?.first_name || "Unknown"} ${comment.author?.last_name || "User"}`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {comment.content}
                          </Typography>
                          <Typography variant="caption" display="block">
                            {comment.created_at ? new Date(comment.created_at).toLocaleString() : "N/A"}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < comments.length - 1 && <Divider variant="inset" />}
                </React.Fragment>
              ))
            ) : (
              <Typography>No comments yet.</Typography>
            )}
          </List>

          {/* Add Comment Form */}
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading} // Disable the button while loading
              sx={{ marginTop: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" /> // Show spinner
              ) : (
                "Submit Comment"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PostDetail;