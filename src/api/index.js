import axios from "axios";

export const url = "http://localhost:5000/api";

export const loginAdmin = (pwd) =>
  axios.post(`${url}/auth/loginadmin`, { pwd: pwd }, { withCredentials: true });
export const loginGuest = () =>
  axios.get(`${url}/auth/loginguest`, { withCredentials: true });
export const loginCheck = () =>
  axios.get(`${url}/auth/logincheck`, { withCredentials: true });

export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
