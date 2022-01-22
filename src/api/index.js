import axios from "axios";

export const url = "http://localhost:5000/api";

export const login = () => axios.get(`${url}/login`, { withCredentials: true });
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
