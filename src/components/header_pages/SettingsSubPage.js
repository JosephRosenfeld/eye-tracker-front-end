import "./SettingsSubPage.css";

/*--- Hooks Imports ---*/
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const SettingsSubPage = () => {
  /* Form state */
  const [editable, isEditable] = useState(false);
  /*Get all data from redux data store*/

  /*Load values into local component level state*/
  //should have default vals of what was in the redux store
  const [settings, setSettings] = useState({
    abbreviations: {
      systane: "S",
    },
    colors: {
      systane: '#fffff"',
    },
  });

  const handleChangeText = () => {};

  const onSubmit = () => {};
  //Form submit func
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
            <input type='text'></input>
          </div>
          <div className='abrev-item'>
            <label>MURO EYE DROP</label>
            <input type='text'></input>
          </div>
          <div className='abrev-item'>
            <label>MURO OINTMENT</label>
            <input type='text'></input>
          </div>
          <div className='abrev-item'>
            <label>EROSION</label>
            <input type='text'></input>
          </div>
          <div className='abrev-item'>
            <label>NOTE</label>
            <input type='text'></input>
          </div>
          <div className='abrev-item'>
            <label>DAILY REVIEW</label>
            <input type='text'></input>
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
