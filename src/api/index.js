import axios from "axios";

export const url = (process.env.NODE_ENV = "production"
  ? process.env.REACT_APP_PROD_API_URI
  : process.env.REACT_APP_DEV_API_URI);

/*--- Auth Endpoints ---*/
export const loginAdmin = (pwd) =>
  axios.post(`${url}/auth/loginadmin`, { pwd: pwd }, { withCredentials: true });
export const loginGuest = () =>
  axios.get(`${url}/auth/loginguest`, { withCredentials: true });
export const loginCheck = () =>
  axios.get(`${url}/auth/logincheck`, { withCredentials: true });

/*--- Log Endpoints ---*/
export const getLogs = (pwd) =>
  axios.get(`${url}/data/logs`, { withCredentials: true });

export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
