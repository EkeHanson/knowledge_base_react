import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  CssBaseline,
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
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch post and comments
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data.post);
        setComments(response.data.comments);
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

    try {
      const response = await axios.post(`/api/posts/${id}/comments`, {
        content: newComment,
      });
      setComments([...comments, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: "background.default" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            By {post.author} | {new Date(post.date).toLocaleDateString()}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
        </Paper>

        {/* Comments Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <List>
            {comments.map((comment, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    {comment.author.charAt(0)}
                  </Avatar>
                  <ListItemText
                    primary={comment.author}
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
                          {new Date(comment.date).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < comments.length - 1 && <Divider variant="inset" />}
              </React.Fragment>
            ))}
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
            <Button type="submit" variant="contained" color="primary">
              Submit Comment
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PostDetail;