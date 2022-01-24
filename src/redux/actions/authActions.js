import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../constants/constants";
import * as api from "../../api/index";

//Action creators
export const login = () => async (dispatch) => {
  try {
    //in reality when I click the login button it should validate it on the server
    //side before giving me a cookie. The cookie will be given to me without me
    //really having to handle it in the reducer, but it should also return some
    //auth = true in the payload back. That way I can set the auth var as true in
    //my redux store.

    //Then in the routing we do some conditional logic based on that redux var. Then
    //All we have to do as well is check cookie on initial render and then set
    //that redux var so we can allow those routes.

    //so all the other logic is handled server side as far as if we're updating
    //the master user or just a session row
    dispatch({
      type: LOGIN_LOADING,
      payload: {},
    });
    const { data } = await api.login();
    //LOGIC FOR ERRORS (maybe? or does the api automatically throw an error?)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: {
        errorMessage: "Unable to connect to server, please try again later",
        isLoading: false,
      },
    });
  }
};
