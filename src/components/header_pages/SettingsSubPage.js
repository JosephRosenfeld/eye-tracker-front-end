import "./SettingsSubPage.css";

/*--- Hooks Imports ---*/
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/*--- Components Imports ---*/
import PopupButtons from "./PopupButtons";

const SettingsSubPage = () => {
  const [editable, setEditable] = useState(false);
  console.log(editable);

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

  const reset = () => {
    setAbrevSettings(testSettingsAbbrevObj);
    setColorSettings(testSettingsColorsObj);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //update global state store / reducers
    //(which I assume also updates the database/local storage?)
  };

  return (
    <div className='settings-container'>
      <form className='settings-content' onSubmit={onSubmit}>
        <div className='form-group form-group-colors'>
          <div className='form-group-title'>Colors</div>
          <div className='color-item'>
            <label>SYSTANE EYE DROP </label>
            <input
              type='color'
              value={colorSettings.systane}
              onChange={(e) =>
                setColorSettings({
                  ...colorSettings,
                  systane: e.target.value,
                })
              }
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>MURO EYE DROP</label>
            <input
              type='color'
              value={colorSettings.muro}
              onChange={(e) =>
                setColorSettings({
                  ...colorSettings,
                  muro: e.target.value,
                })
              }
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>MURO OINTMENT</label>
            <input
              type='color'
              value={colorSettings.muro_ointment}
              onChange={(e) =>
                setColorSettings({
                  ...colorSettings,
                  muro_ointment: e.target.value,
                })
              }
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>EROSION</label>
            <input
              type='color'
              value={colorSettings.erosion}
              onChange={(e) =>
                setColorSettings({
                  ...colorSettings,
                  erosion: e.target.value,
                })
              }
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='color-item'>
            <label>NOTE</label>
            <input
              type='color'
              value={colorSettings.note}
              onChange={(e) =>
                setColorSettings({
                  ...colorSettings,
                  note: e.target.value,
                })
              }
              disabled={editable ? "" : "disabled"}
            ></input>
          </div>
          <div className='daily-review-section'>
            <div className='daily-review-title'>Daily Review</div>
            <div className='color-item'>
              <label>ONE</label>
              <input
                type='color'
                value={colorSettings.daily_review1}
                onChange={(e) =>
                  setColorSettings({
                    ...colorSettings,
                    daily_review1: e.target.value,
                  })
                }
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>TWO</label>
              <input
                type='color'
                value={colorSettings.daily_review2}
                onChange={(e) =>
                  setColorSettings({
                    ...colorSettings,
                    daily_review2: e.target.value,
                  })
                }
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>THREE</label>
              <input
                type='color'
                value={colorSettings.daily_review3}
                onChange={(e) =>
                  setColorSettings({
                    ...colorSettings,
                    daily_review3: e.target.value,
                  })
                }
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>FOUR</label>
              <input
                type='color'
                value={colorSettings.daily_review4}
                onChange={(e) =>
                  setColorSettings({
                    ...colorSettings,
                    daily_review4: e.target.value,
                  })
                }
                disabled={editable ? "" : "disabled"}
              ></input>
            </div>
            <div className='color-item'>
              <label>FIVE</label>
              <input
                type='color'
                value={colorSettings.daily_review5}
                onChange={(e) =>
                  setColorSettings({
                    ...colorSettings,
                    daily_review5: e.target.value,
                  })
                }
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
              value={abrevSettings.systane}
              onChange={(e) =>
                setAbrevSettings({
                  ...abrevSettings,
                  systane: e.target.value,
                })
              }
              readOnly={editable ? "" : "readonly"}
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
              readOnly={editable ? "" : "readonly"}
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
              readOnly={editable ? "" : "readonly"}
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
              readOnly={editable ? "" : "readonly"}
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
              readOnly={editable ? "" : "readonly"}
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
              readOnly={editable ? "" : "readonly"}
            ></input>
          </div>
        </div>
        <PopupButtons
          editable={editable}
          setEditable={setEditable}
          reset={reset}
          onSubmit={onSubmit}
        />
      </form>
    </div>
  );
};

export default SettingsSubPage;
