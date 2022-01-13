import "./RemindersSubPage.css";

/*--- Hooks Imports ---*/
import { useState } from "react";

const RemindersSubPage = () => {
  const [editable, setEditable] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [haveSaved, setHaveSaved] = useState(false); //Always show errors after first save

  /*Get all data from redux data store*/
  const remindersObj = [
    { type: "muro", time: "9:00" },
    { type: "systane", time: "11:00" },
    { type: "systane", time: "12:00" },
    { type: "muro", time: "14:00" },
    { type: "muro", time: "19:00" },
    { type: "note", time: "20:00" },
    { type: "muro_ointment", time: "22:00" },
  ];

  /*Load values into local component level state*/
  //should have default vals of what was in the redux store
  const [reminders, setReminders] = useState(remindersObj);

  /*
  //Assumes a single layer obj for state and the setState func
  const onChange = (e, state, setState) => {
    const { name, value, type } = e.target;

    setState({ ...state, [name]: value });
    if (type == "text") {
      /*If we/ve already tried to submit and the edit was on a text input then
      update the form errors shown*/ /*
      if (haveSaved) {
        setFormErrors(validate({ ...state, [name]: value }));
      }
    }
  };

  /*
  const reset = () => {
    setAbrevSettings(testSettingsAbbrevObj);
    setColorSettings(testSettingsColorsObj);
    setHaveSaved(false);
    setFormErrors(validate(testSettingsAbbrevObj));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //update global state store / reducers
    //(which I assume also updates the database/local storage?)
  };


\  };*/

  return (
    <>
      <div className='reminders-container'>
        <div className='reminders-content'>
          <div className='reminders-header'>
            <div className='reminder-cell'>Type</div>
            <div className='reminder-cell'>Time</div>
            <div class='reminder-offset'></div>
          </div>
          <div className='reminder-item'>
            <select name='type' className='reminder-cell reminder-type'>
              <option value='systane'>Systane Eye Drop</option>
              <option value='muro'>Muro Eye Drop</option>
              <option value='muro_ointment'>Muro Ointment</option>
              <option value='note'>Note</option>
              <option value='daily_review'>Daily Review</option>
            </select>
            <input
              className='reminder-cell reminder-time'
              type='time'
              value='12:12 pm'
            ></input>
            <div class='reminder-icon'></div>
          </div>
          <div className='reminder-item'>
            <div className='reminder-cell'>Systane</div>
            <div className='reminder-cell'>18:00 p.m. </div>
            <div class='reminder-icon'></div>
          </div>
          <div className='reminder-item'>
            <div className='reminder-cell'>Muro</div>
            <div className='reminder-cell'>12:12 p.m.</div>
            <div class='reminder-icon'></div>
          </div>
        </div>
      </div>
      {/*
    <div className='reminders-container'>
      <form className='reminders-content' onSubmit={onSubmit}>
        <div className='form-group form-group-colors'>
          <div className='form-group-title'>Colors</div>
          <div className='color-item'>
            <label>SYSTANE EYE DROP </label>
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
        <PopupButtons
          editable={editable}
          setEditable={setEditable}
          reset={reset}
          onSubmit={onSubmit}
        />
      </form>
  </div>*/}
    </>
  );
};

export default RemindersSubPage;
