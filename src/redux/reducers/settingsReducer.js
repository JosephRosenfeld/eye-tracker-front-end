import {
  SETTINGS_LOADING,
  GET_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_SUCCESS,
  SETTINGS_ERROR,
} from "../constants/constants";

const initialSettings = {
  systane_abbreviation: "S",
  muro_abbreviation: "M",
  muro_ointment_abbreviation: "O",
  erosion_abbreviation: "E",
  note_abbreviation: "N",
  daily_review_abbreviation: "D",
  systane_color: "#48ea69",
  muro_color: "#fda744",
  muro_ointment_color: "#6991ec",
  erosion_color: "#ffec1f",
  note_color: "#a14545",
  daily_review1_color: "#ff0f0f",
  daily_review2_color: "#ea6cdf",
  daily_review3_color: "#9146dd",
  daily_review4_color: "#5045e8",
  daily_review5_color: "#42b7ff",
};

const initialState = {
  settingsIsLoading: false,
  settings_obj: initialSettings,
  settingsErrorTxt: "",
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_LOADING:
      return { ...state, settingsIsLoading: true };
    case GET_SETTINGS_SUCCESS:
    case UPDATE_SETTINGS_SUCCESS:
      return {
        settingsIsLoading: false,
        settings_obj: action.payload,
        settingsErrorTxt: "",
      };
    case SETTINGS_ERROR:
      return {
        ...state,
        settingsIsLoading: false,
        settingsErrorTxt: action.payload.errorTxt,
      };
    default:
      return state;
  }
};
