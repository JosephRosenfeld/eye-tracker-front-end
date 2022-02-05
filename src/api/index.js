import axios from "axios";

const url =
  process.env.NODE_ENV == "production"
    ? process.env.REACT_APP_PROD_API_URI
    : process.env.REACT_APP_DEV_API_URI;

/*--- Auth Endpoints ---*/
export const loginAdmin = (pwd) => {
  return axios.post(
    `${url}/api/auth/loginadmin`,
    { pwd: pwd },
    { withCredentials: true }
  );
};
export const loginGuest = () => {
  return axios.get(`${url}/api/auth/loginguest`, { withCredentials: true });
};
export const loginCheck = () => {
  return axios.get(`${url}/api/auth/logincheck`, { withCredentials: true });
};

/*--- Log Endpoints ---*/
export const getLogs = () => {
  return axios.get(`${url}/api/data/logs/`, { withCredentials: true });
};
export const createLog = (log) => {
  return axios.post(`${url}/api/data/logs`, log, { withCredentials: true });
};
export const updateLog = (log) => {
  return axios.patch(`${url}/api/data/logs/:id`, log, {
    withCredentials: true,
  });
};
export const deleteLog = () => {
  return axios.delete(`${url}/api/data/logs/:id`, { withCredentials: true });
};

/*--- Setting Endpoints ---*/
export const getSettings = () => {
  return axios.get(`${url}/api/data/settings`, { withCredentials: true });
};
export const updateSettings = (settings_obj) => {
  return axios.patch(`${url}/api/data/settings`, settings_obj, {
    withCredentials: true,
  });
};
