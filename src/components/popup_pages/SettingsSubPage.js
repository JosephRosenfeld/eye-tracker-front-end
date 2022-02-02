import "./SettingsSubPage.css";

/*--- Hooks Imports ---*/
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/*--- Actions Imports ---*/
import { updateSettings } from "../../redux/actions/settingsActions";

const SettingsSubPage = () => {
  const [editable, setEditable] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [haveSaved, setHaveSaved] = useState(false);

  const dispatch = useDispatch();

  //Get cur settings data from redux data store
  const savedSettings = useSelector((state) => {
    state.settings_obj;
  });

  //Initialize form data with redux settings
  const [formSettings, setFormSettings] = useState(savedSettings);

  //Assumes a single layer obj for state and the setState func
  const onChange = (e) => {
    let { name, value, type } = e.target;
    setFormSettings({ ...formSettings, [name]: value });
    /*If we've already hit submit, display errors as we change*/
    if (haveSaved) {
      setFormErrors(validate({ ...state, [name]: value }));
    }
  };

  const reset = () => {
    setFormSettings(savedSettings);
    setHaveSaved(false);
    setFormErrors(validate(savedSettings));
  };

  const onSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    setHaveSaved(true);
    //update error state in order to rerender form
    const errors = validate(abrevSettings);
    setFormErrors(errors);

    /*If there aren't errors, set editable to false, set have saved to false,
    and update redux store*/
    if (Object.keys(errors).length === 0) {
      setEditable(false);
      setHaveSaved(false);
      dispatch(updateSettings(formSettings));
    }
  };

  const validate = (settingsObj) => {
    const errors = {};
    //defining validation regex's
    const singleCharReg = /^.$/;
    const letterReg = /^[a-zA-Z]$/;
    //regex for abrev items
    const abrevReg = /abbreviation$/;
    //basic email regex (not fully accurate)
    // const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const whiteSpaceReg = /^\s*$/;

    //Validate all keys
    for (const [key, value] of Object.entries(settingsObj)) {
      //validations for only abbreviation fields
      if (abrevReg.test(key)) {
        !singleCharReg.test(value)) {
          errors[key] = "Must be a single character";
        } else if (!letterReg.test(value)) {
          errors[key] = "Must be a letter";
        }
      }
      if (value == "") {
        errors[key] = "This field is required";
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
              value={formSettings.systane}
              onChange={onChange}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>MURO EYE DROP</label>
            <input
              type='color'
              name='muro'
              value={formSettings.muro}
              onChange={onChange}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>MURO OINTMENT</label>
            <input
              type='color'
              name='muro_ointment'
              value={formSettings.muro_ointment}
              onChange={onChange}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>EROSION</label>
            <input
              type='color'
              name='erosion'
              value={formSettings.erosion}
              onChange={onChange}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>NOTE</label>
            <input
              type='color'
              name='note'
              value={formSettings.note}
              onChange={onChange}
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
                value={formSettings.daily_review1}
                onChange={onChange}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>TWO</label>
              <input
                type='color'
                name='daily_review2'
                value={formSettings.daily_review2}
                onChange={onChange}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>THREE</label>
              <input
                type='color'
                name='daily_review3'
                value={formSettings.daily_review3}
                onChange={onChange}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>FOUR</label>
              <input
                type='color'
                name='daily_review4'
                value={formSettings.daily_review4}
                onChange={onChange}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>FIVE</label>
              <input
                type='color'
                name='daily_review5'
                value={formSettings.daily_review5}
                onChange={onChange}
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
              value={formSettings.systane}
              onChange={onChange}
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
              value={formSettings.muro}
              onChange={onChange}
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
              value={formSettings.muro_ointment_abbreviation}
              onChange={onChange}
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
              value={formSettings.erosion}
              onChange={onChange}
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
              value={formSettings.note}
              onChange={onChange}
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
              value={formSettings.daily_review}
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
