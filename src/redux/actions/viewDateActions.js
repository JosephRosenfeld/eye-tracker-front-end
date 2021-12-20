import { CHANGE_DATE } from "../constants/constants";

export const changeDt = (dt) => {
  return {
    type: CHANGE_DATE,
    payload: dt,
  };
};
