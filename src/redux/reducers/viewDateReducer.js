import { CHANGE_DATE } from "../constants/constants";

let curDate = new Date();

/*date is represented as three distinct components because once the 
date is read by a component its parsed by the Date constructor and its highly
reccomended not to rely on string parsing as browser to browser implementations
may differ. For this reason we're using a year, month, and day value. In each component these
values will be passed to the date constructor as parameters. Its also important to note that all the methods shown below evaluate to local
time*/

const initialState = {
  year: curDate.getFullYear(),
  month: curDate.getMonth(),
  day: curDate.getDate(),
  increased: true,
};

export const viewDtReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATE:
      return action.payload;
    default:
      return state;
  }
};
