import { CHANGE_PAGE } from "../constants/constants";

/*choose to store initial state with the '/' in pathname so if it's the root we 
don't get back an empty string, aka easier to debug. In each individual component
we pull this state and then perform the substring operation to remove the forward slash*/

export const pageReducer = (state = window.location.pathname, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.payload;
    default:
      return state;
  }
};
