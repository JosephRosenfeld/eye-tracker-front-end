import { LOGIN } from "../constants/constants";
import * as api from "../api";

//Action creators
export const loginAC = () => async (dispatch) => {
  try {
    const { data } = await api.login();
    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
