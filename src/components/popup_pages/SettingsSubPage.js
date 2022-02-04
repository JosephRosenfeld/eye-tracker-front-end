import "./SettingsSubPage.css";

/*--- Hooks Imports ---*/
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

/*--- Actions Imports ---*/
import { updateSettings } from "../../redux/actions/settingsActions";

const SettingsSubPage = () => {
  console.log("settings render");
  const [editable, setEditable] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [haveSaved, setHaveSaved] = useState(false);

  const dispatch = useDispatch();

  //Get cur settings data from redux data store
  const savedSettings = useSelector((state) => state.settings.settings_obj);

  useEffect(() => {
    console.log("use effect ran");
    setFormSettings(savedSettings);
  }, [savedSettings]);

  //Initialize form data with redux settings
  const [formSettings, setFormSettings] = useState(savedSettings);
  console.log(formSettings);

  const onChange = (e) => {
    let { name, value } = e.target;
    setFormSettings({ ...formSettings, [name]: value });
    /*If we've already hit submit, display errors as we change*/
    if (haveSaved) {
      setFormErrors(validate({ ...formSettings, [name]: value }));
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
    const errors = validate(formSettings);
    setFormErrors(errors);

    /*If there aren't errors, set editable to false, set have saved to false,
    and update redux store*/
    if (Object.keys(errors).length === 0) {
      setEditable(false);
      setHaveSaved(false);
      console.log(formSettings);
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

    //Validate all keys
    for (const [key, value] of Object.entries(settingsObj)) {
      //validations for only abbreviation fields
      if (abrevReg.test(key)) {
        if (!letterReg.test(value)) {
          errors[key] = "Must be a letter";
        }
        if (!singleCharReg.test(value)) {
          errors[key] = "Must be a single character";
        }
      }
      if (value == "") {
        errors[key] = "This field is required";
      }
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
              name='systane_color'
              value={formSettings.systane_color}
              onChange={onChange}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>MURO EYE DROP</label>
            <input
              type='color'
              name='muro_color'
              value={formSettings.muro_color}
              onChange={onChange}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>MURO OINTMENT</label>
            <input
              type='color'
              name='muro_ointment_color'
              value={formSettings.muro_ointment_color}
              onChange={onChange}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>EROSION</label>
            <input
              type='color'
              name='erosion_color'
              value={formSettings.erosion_color}
              onChange={onChange}
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>NOTE</label>
            <input
              type='color'
              name='note_color'
              value={formSettings.note_color}
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
                name='daily_review1_color'
                value={formSettings.daily_review1_color}
                onChange={onChange}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>TWO</label>
              <input
                type='color'
                name='daily_review2_color'
                value={formSettings.daily_review2_color}
                onChange={onChange}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>THREE</label>
              <input
                type='color'
                name='daily_review3_color'
                value={formSettings.daily_review3_color}
                onChange={onChange}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>FOUR</label>
              <input
                type='color'
                name='daily_review4_color'
                value={formSettings.daily_review4_color}
                onChange={onChange}
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>FIVE</label>
              <input
                type='color'
                name='daily_review5_color'
                value={formSettings.daily_review5_color}
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
              name='systane_abbreviation'
              value={formSettings.systane_abbreviation}
              onChange={onChange}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.systane_abbreviation}
            ></input>
            <span className='error-txt'>{formErrors.systane_abbreviation}</span>
          </div>
          <div className='abrev-item'>
            <label>MURO EYE DROP</label>
            <input
              type='text'
              name='muro_abbreviation'
              value={formSettings.muro_abbreviation}
              onChange={onChange}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.muro_abbreviation}
            ></input>
            <span className='error-txt'>{formErrors.muro_abbreviation}</span>
          </div>
          <div className='abrev-item'>
            <label>MURO OINTMENT</label>
            <input
              type='text'
              name='muro_ointment_abbreviation'
              value={formSettings.muro_ointment_abbreviation}
              onChange={onChange}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.muro_ointment_abbreviation}
            ></input>
            <span className='error-txt'>
              {formErrors.muro_ointment_abbreviation}
            </span>
          </div>
          <div className='abrev-item'>
            <label>EROSION</label>
            <input
              type='text'
              name='erosion_abbreviation'
              value={formSettings.erosion_abbreviation}
              onChange={onChange}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.erosion_abbreviation}
            ></input>
            <span className='error-txt'>{formErrors.erosion_abbreviation}</span>
          </div>
          <div className='abrev-item'>
            <label>NOTE</label>
            <input
              type='text'
              name='note_abbreviation'
              value={formSettings.note_abbreviation}
              onChange={onChange}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.note_abbreviation}
            ></input>
            <span className='error-txt'>{formErrors.note_abbreviation}</span>
          </div>
          <div className='abrev-item'>
            <label>DAILY REVIEW</label>
            <input
              type='text'
              name='daily_review_abbreviation'
              value={formSettings.daily_review_abbreviation}
              onChange={onChange}
              readOnly={editable ? "" : "readonly"}
              data-error={formErrors.daily_review_abbreviation}
            ></input>
            <span className='error-txt'>
              {formErrors.daily_review_abbreviation}
            </span>
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
      </form>
    </div>
  );
};

export default SettingsSubPage;
