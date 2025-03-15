import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/", // Replace with your backend URL
});

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};