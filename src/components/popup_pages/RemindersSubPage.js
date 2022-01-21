import "./RemindersSubPage.css";

/*--- Hooks Imports ---*/
import { useState } from "react";

const RemindersSubPage = () => {
  /*Get all data from redux data store*/
  //When comp updates redux state remindersSubPage comp will rerender
  const remindersObj = [
    { id: 1, type: "muro", time: "9:00" },
    { id: 2, type: "systane", time: "11:00" },
    { id: 3, type: "systane", time: "12:00" },
    { id: 4, type: "muro", time: "14:00" },
    { id: 5, type: "muro", time: "19:00" },
    { id: 6, type: "note", time: "20:00" },
    { id: 7, type: "muro_ointment", time: "22:00" },
  ];

  /* onEdit function that we pass to each reminder comp*/
  //These funcs will update redux store from within the comp

  /* onDelete function that we pass to each reminder comp*/
  //These funcs will update redux store from within the comp

  /* onAdd function will add an element to the redux store */

  return (
    <div className='reminders-container'>
      <div className='reminders-content'>{}</div>
    </div>
  );
};

export default RemindersSubPage;
