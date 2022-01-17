import "./SettingsSubPage.css";

/*--- Hooks Imports ---*/
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/*--- Components Imports ---*/
import PopupButtons from "./PopupButtons";
import NumberFormat from "react-number-format";

const SettingsSubPage = () => {
  const [editable, setEditable] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [haveSaved, setHaveSaved] = useState(false); //Always show errors after first save

  /*Get all data from redux data store*/
  const testUserInfoObj = {
    email: "josephgrosenfeld@gmail.com",
    phone: "5406865236",
  };
  const testSettingsAbbrevObj = {
    systane: "S",
    muro: "M",
    muro_ointment: "O",
    erosion: "E",
    note: "N",
    daily_review: "D",
  };
  const testSettingsColorsObj = {
    systane: "#48ea69",
    muro: "#fda744",
    muro_ointment: "#6991ec",
    erosion: "#ffec1f",
    note: "#a14545",
    daily_review1: "#ff0f0f",
    daily_review2: "#ea6cdf",
    daily_review3: "#9146dd",
    daily_review4: "#5045e8",
    daily_review5: "#42b7ff",
  };

  /*Load values into local component level state*/
  //should have default vals of what was in the redux store
  const [abrevSettings, setAbrevSettings] = useState(testSettingsAbbrevObj);
  const [colorSettings, setColorSettings] = useState(testSettingsColorsObj);
  const [userSettings, setUserSettings] = useState(testUserInfoObj);

  //Assumes a single layer obj for state and the setState func
  const onChange = (e, state, setState) => {
    let { name, value, type } = e.target;

    setState({ ...state, [name]: value });
    /*If we/ve already tried to submit and the edit was on a text input then
      update the form errors shown*/
    if (type == "text" && haveSaved) {
      if (name == "email" || name == "phone") {
        setFormErrors(validate(abrevSettings, { ...state, [name]: value }));
      } else {
        setFormErrors(validate({ ...state, [name]: value }, userSettings));
      }
    }
  };

  const reset = () => {
    setAbrevSettings(testSettingsAbbrevObj);
    setColorSettings(testSettingsColorsObj);
    setUserSettings(testUserInfoObj);
    setHaveSaved(false);
    setFormErrors(validate(testSettingsAbbrevObj, testUserInfoObj));
  };

  const onSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    setHaveSaved(true);
    //update error state in order to rerender form
    const errors = validate(abrevSettings, userSettings);
    setFormErrors(errors);

    /*If there aren't errors, set editable to false, set have saved to false,
    and update redux store*/
    if (Object.keys(errors).length === 0) {
      setEditable(false);
      setHaveSaved(false);
      //update redux store
    } else {
    }

    //update global state store / reducers
    //(which I assume also updates the database/local storage?)
  };

  const validate = (abrevObj, userObj) => {
    const errors = {};
    //defining validation regex's
    const singleCharReg = /^.$/;
    const letterReg = /^[a-zA-Z]$/;
    //basic email regex (not fully accurate)
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whiteSpaceReg = /^\s*$/;

    //Abrev validating
    for (const [key, value] of Object.entries(abrevObj)) {
      if (value == "") {
        errors[key] = "This field is required";
      } else if (!singleCharReg.test(value)) {
        errors[key] = "Must be a single character";
      } else if (!letterReg.test(value)) {
        errors[key] = "Must be a letter";
      }
    }

    //userObj validating
    if (!whiteSpaceReg.test(userObj.email) && !emailReg.test(userObj.email)) {
      errors["email"] = "Invalid email";
    }
    return errors;
  };

  return (
    <div className='settings-container'>
      <form className='settings-content' onSubmit={onSubmit}>
        <div className='form-group form-group-colors'>
          <div className='form-group-title'>Colors</div>
          <div className='color-item'>
            <label>SYSTANE EYE DROP</label>
            <input
              type='color'
              name='systane'
              value={colorSettings.systane}
              onChange={(e) => onChange(e, colorSettings, setColorSettings)}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>MURO EYE DROP</label>
            <input
              type='color'
              name='muro'
              value={colorSettings.muro}
              onChange={(e) => onChange(e, colorSettings, setColorSettings)}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>MURO OINTMENT</label>
            <input
              type='color'
              name='muro_ointment'
              value={colorSettings.muro_ointment}
              onChange={(e) => onChange(e, colorSettings, setColorSettings)}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>EROSION</label>
            <input
              type='color'
              name='erosion'
              value={colorSettings.erosion}
              onChange={(e) => onChange(e, colorSettings, setColorSettings)}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>NOTE</label>
            <input
              type='color'
              name='note'
              value={colorSettings.note}
              onChange={(e) => onChange(e, colorSettings, setColorSettings)}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='daily-review-section'>
            <div className='daily-review-title'>Daily Review</div>
            <div className='color-item'>
              <label>ONE</label>
              <input
                type='color'
                name='daily_review1'
                value={colorSettings.daily_review1}
                onChange={(e) => onChange(e, colorSettings, setColorSettings)}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>TWO</label>
              <input
                type='color'
                name='daily_review2'
                value={colorSettings.daily_review2}
                onChange={(e) => onChange(e, colorSettings, setColorSettings)}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>THREE</label>
              <input
                type='color'
                name='daily_review3'
                value={colorSettings.daily_review3}
                onChange={(e) => onChange(e, colorSettings, setColorSettings)}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>FOUR</label>
              <input
                type='color'
                name='daily_review4'
                value={colorSettings.daily_review4}
                onChange={(e) => onChange(e, colorSettings, setColorSettings)}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>FIVE</label>
              <input
                type='color'
                name='daily_review5'
                value={colorSettings.daily_review5}
                onChange={(e) => onChange(e, colorSettings, setColorSettings)}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
          </div>
        </div>
        <div className='form-group form-group-abbreviations'>
          <div className='form-group-title'>Abbreviations</div>
          <div className='abrev-item'>
            <label>SYSTANE EYE DROP</label>
            <input
              type='text'
              name='systane'
              value={abrevSettings.systane}
              onChange={(e) => onChange(e, abrevSettings, setAbrevSettings)}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.systane}
            ></input>
            <span className='error-txt'>{formErrors.systane}</span>
          </div>
          <div className='abrev-item'>
            <label>MURO EYE DROP</label>
            <input
              type='text'
              name='muro'
              value={abrevSettings.muro}
              onChange={(e) => onChange(e, abrevSettings, setAbrevSettings)}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.muro}
            ></input>
            <span className='error-txt'>{formErrors.muro}</span>
          </div>
          <div className='abrev-item'>
            <label>MURO OINTMENT</label>
            <input
              type='text'
              name='muro_ointment'
              value={abrevSettings.muro_ointment}
              onChange={(e) => onChange(e, abrevSettings, setAbrevSettings)}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.muro_ointment}
            ></input>
            <span className='error-txt'>{formErrors.muro_ointment}</span>
          </div>
          <div className='abrev-item'>
            <label>EROSION</label>
            <input
              type='text'
              name='erosion'
              value={abrevSettings.erosion}
              onChange={(e) => onChange(e, abrevSettings, setAbrevSettings)}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.erosion}
            ></input>
            <span className='error-txt'>{formErrors.erosion}</span>
          </div>
          <div className='abrev-item'>
            <label>NOTE</label>
            <input
              type='text'
              name='note'
              value={abrevSettings.note}
              onChange={(e) => onChange(e, abrevSettings, setAbrevSettings)}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.note}
            ></input>
            <span className='error-txt'>{formErrors.note}</span>
          </div>
          <div className='abrev-item'>
            <label>DAILY REVIEW</label>
            <input
              type='text'
              name='daily_review'
              value={abrevSettings.daily_review}
              onChange={(e) => onChange(e, abrevSettings, setAbrevSettings)}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.daily_review}
            ></input>
            <span className='error-txt'>{formErrors.daily_review}</span>
          </div>
        </div>
        <div className='settings-button-group'>
          {!editable && (
            <button
              className='edit-button settings-button'
              type='button'
              onClick={(e) => {
                setEditable(true);
              }}
            >
              Edit Settings
            </button>
          )}
          {editable && (
            <>
              <button type='submit' className='save-button settings-button'>
                Save
              </button>
              <button
                type='button'
                className='cancel-button settings-button'
                onClick={(e) => {
                  setEditable(false);
                  reset();
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
        {/* <div className='form-group form-group-user-info'>
          <div className='form-group-title'>
            User Info{" "}
            <span className='optional-txt'>
              <i>(Optional)</i>
            </span>
          </div>
          <div className='user-item'>
            <label>EMAIL</label>
            <input
              type='text'
              name='email'
              value={userSettings.email}
              onChange={(e) => onChange(e, userSettings, setUserSettings)}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.email}
            ></input>
            <span className='error-txt'>{formErrors.email}</span>
          </div>
          <div className='user-item'>
            <label>PHONE NUMBER</label>
            <NumberFormat
              format='+1 (###) ###-####'
              type='text'
              name='phone'
              value={userSettings.phone}
              onChange={(e) => onChange(e, userSettings, setUserSettings)}
              readOnly={editable ? "" : "readonly"}
            />
          </div> 
        </div>*/}
        {/* <PopupButtons
          editable={editable}
          setEditable={setEditable}
          reset={reset}
          onSubmit={onSubmit}
        /> */}
      </form>
    </div>
  );
};

export default SettingsSubPage;
