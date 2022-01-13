import "./AddSubPage.css";

/*--- Hooks imports ---*/
import { useState } from "react";

const AddSubPage = () => {
  return (
    <div className='add-item-container'>
      <form className='add-item-content'>
        <div className='add-item-title'>Item Info</div>
        <div className='add-form-item'>
          <label>TYPE</label>
          <input type='text'></input>
        </div>
        <div className='add-form-item'>
          <label>DATE</label>
          <input type='date'></input>
        </div>
        <div className='add-form-item'>
          <label>TIME</label>
          <input type='time'></input>
        </div>
        <div className='add-form-item'>
          <label>NOTES</label>
          <textarea name='notes'></textarea>
        </div>
      </form>
    </div>
  );
};

export default AddSubPage;
