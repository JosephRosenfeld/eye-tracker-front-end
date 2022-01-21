import axios from "axios";

export const url = process.env.REACT_APP_DEV_API_URI;

export const login = (pin) => axios.post(`${url}/login`, pin);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
