import "./SettingsSubPage.css";

/*--- Hooks Imports ---*/
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const SettingsSubPage = () => {
  /* Form state */
  const [editable, isEditable] = useState(false);

  /*Get all data from redux data store*/
  const testSettingsAbbrevObj = {
    systane: "S",
    muro: "M",
    muro_ointment: "O",
    erosion: "E",
    note: "N",
    daily_review: "D",
  };
  const testSettingsColorsObj = {
    systane: "#3dff64",
    muro: "#af99ff",
    muro_ointment: "#2b00ff",
    erosion: "#ff0000",
    note: "#833a3a",
    daily_review1: "red",
    daily_review2: "red",
    daily_review3: "green",
    daily_review4: "blue",
    daily_review5: "blue",
  };

  /*Load values into local component level state*/
  //should have default vals of what was in the redux store
  const [abrevSettings, setAbrevSettings] = useState(testSettingsAbbrevObj);
  const [colorSettings, setColorSettings] = useState(testSettingsColorsObj);

  const onChange = (e, level1, level2) => {
    console.log(e);
  };

  const cancel = () => {};

  const onSubmit = () => {};
  //e.preventDefault();
  //
  //update global state store / reducers
  //(which I assume also updates the database/local storage?)
  /*
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();//Shoouldn't have to clear in our use case
  };*/

  return (
    <div className='settings-container'>
      <form className='settings-content' onSubmit={onSubmit}>
        <div className='form-group form-group-abbreviations'>
          <div className='form-group-title'>Abbreviations</div>
          <div className='abrev-item'>
            <label>SYSTANE EYE DROP</label>
            <input
              type='text'
              value={abrevSettings.systane}
              onChange={(e) =>
                setAbrevSettings({
                  ...abrevSettings,
                  systane: e.target.value,
                })
              }
            ></input>
          </div>
          <div className='abrev-item'>
            <label>MURO EYE DROP</label>
            <input
              type='text'
              value={abrevSettings.muro}
              onChange={(e) =>
                setAbrevSettings({
                  ...abrevSettings,
                  muro: e.target.value,
                })
              }
            ></input>
          </div>
          <div className='abrev-item'>
            <label>MURO OINTMENT</label>
            <input
              type='text'
              value={abrevSettings.muro_ointment}
              onChange={(e) =>
                setAbrevSettings({
                  ...abrevSettings,
                  muro_ointment: e.target.value,
                })
              }
            ></input>
          </div>
          <div className='abrev-item'>
            <label>EROSION</label>
            <input
              type='text'
              value={abrevSettings.erosion}
              onChange={(e) =>
                setAbrevSettings({
                  ...abrevSettings,
                  erosion: e.target.value,
                })
              }
            ></input>
          </div>
          <div className='abrev-item'>
            <label>NOTE</label>
            <input
              type='text'
              value={abrevSettings.note}
              onChange={(e) =>
                setAbrevSettings({
                  ...abrevSettings,
                  note: e.target.value,
                })
              }
            ></input>
          </div>
          <div className='abrev-item'>
            <label>DAILY REVIEW</label>
            <input
              type='text'
              value={abrevSettings.daily_review}
              onChange={(e) =>
                setAbrevSettings({
                  ...abrevSettings,
                  daily_review: e.target.value,
                })
              }
            ></input>
          </div>
        </div>
        <div className='form-group form-group-colors'>
          <div className='form-group-title'>Colors</div>
          <div className='color-item'>
            <label>SYSTANE EYE DROP </label>
            <input type='color'></input>
          </div>
          <div className='color-item'>
            <label>MURO EYE DROP</label>
            <input type='color'></input>
          </div>
          <div className='color-item'>
            <label>MURO OINTMENT</label>
            <input type='color'></input>
          </div>
          <div className='color-item'>
            <label>EROSION</label>
            <input type='color'></input>
          </div>
          <div className='color-item'>
            <label>NOTE</label>
            <input type='color'></input>
          </div>
          <div className='daily-review-section'>
            <div className='daily-review-title'>DAILY REVIEW</div>
            <div className='color-item'>
              <label>1</label>
              <input type='color'></input>
            </div>
            <div className='color-item'>
              <label>2</label>
              <input type='color'></input>
            </div>
            <div className='color-item'>
              <label>3</label>
              <input type='color'></input>
            </div>
            <div className='color-item'>
              <label>4</label>
              <input type='color'></input>
            </div>
            <div className='color-item'>
              <label>5</label>
              <input type='color'></input>
            </div>
            <div className='daily-review-info'>
              With 1 being the worst and 5 being the best
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsSubPage;
