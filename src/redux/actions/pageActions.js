import { CHANGE_PAGE } from "../constants/constants";

export const changePage = (page) => {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
};
