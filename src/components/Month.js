import "./Month.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/*--- Importing Actions ---*/
import { changeDt } from "../redux/actions/viewDateActions";
import { drawerClasses } from "@mui/material";

const Month = ({ m }) => {
  /*--- Extracting and Destructuring Global State Vars --- */
  const inWidth = useSelector((state) => state.screenSize);
  const viewDt = useSelector((state) => state.viewDt);
  const year = viewDt.year;
  const erosionColor = useSelector(
    (state) => state.settings.settings_obj.erosion_color
  );
  const dailyRColor = useSelector((state) => {
    return {
      r1: state.settings.settings_obj.daily_review1_color,
      r2: state.settings.settings_obj.daily_review2_color,
      r3: state.settings.settings_obj.daily_review3_color,
      r4: state.settings.settings_obj.daily_review4_color,
      r5: state.settings.settings_obj.daily_review5_color,
    };
  });

  //Get logs for erosions and filters for this month
  const logsArr = useSelector((state) =>
    state.logs.logs.filter((log) => {
      let logDt = new Date(log.log_datetime);
      return (
        (log.log_type_name == "Erosion" ||
          log.log_type_name == "Daily Review") &&
        logDt.getFullYear() == year &&
        logDt.getMonth() == m
      );
    })
  );
  //Sort in increasing datetime order (used to get the latest daily review later on)
  logsArr.sort((logA, logB) => {
    let logATime = new Date(logA.log_datetime).getTime();
    let logBTime = new Date(logB.log_datetime).getTime();
    return logATime - logBTime;
  });
  /*Create a map with keys for O(1) lookup time later on when assigning custom
  data attributes*/
  const logsMap = {};
  for (let i = 0; i < logsArr.length; i++) {
    let log = logsArr[i];
    //Create local time date string for key
    let dtKey = new Date(log.log_datetime).toLocaleDateString();
    //If logDt key doesn't exist, set it
    if (!logsMap[dtKey]) {
      logsMap[dtKey] = {};
    }
    //Set erosion to true if we have one or else, previous erosion value
    logsMap[dtKey].erosion =
      log.log_type_name == "Erosion" ? true : logsMap[dtKey].erosion;
    /*Set rating (since it's an ordered array by log date, we can be certain that the 
    latest daily review log item will be used)*/
    logsMap[dtKey].rating =
      log.log_type_name == "Daily Review" ? log.rating : logsMap[dtKey].rating;
  }

  /*--- Double Click Handler ---*/
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToMulti = (newViewDt) => {
    //change view date
    dispatch(
      changeDt({
        year,
        month: parseInt(newViewDt.month),
        day: parseInt(newViewDt.day),
      })
    );

    navigate(inWidth > 800 ? "../week" : "../3day", { newViewDt });
  };

  /*--- Creating Date Array ---*/
  const firstOfMonth = new Date(year, m, 1);
  const monthTxt = firstOfMonth.toLocaleString("en-us", { month: "long" }); //Creating monthTxt
  const pointerDt = new Date(year, m, -firstOfMonth.getDay() + 1);
  const dtArr = new Array(42);
  for (let i = 0; i < dtArr.length; i++) {
    //We added some things to make sure the month and day were always two digits
    dtArr[i] = {
      year: pointerDt.getFullYear(),
      month:
        pointerDt.getMonth() >= 10
          ? pointerDt.getMonth()
          : "0" + pointerDt.getMonth(),
      day:
        pointerDt.getDate() >= 10
          ? pointerDt.getDate()
          : "0" + pointerDt.getDate(),
      erosion: logsMap[pointerDt.toLocaleDateString()]?.erosion,
      rating: logsMap[pointerDt.toLocaleDateString()]?.rating,
    };
    pointerDt.setDate(pointerDt.getDate() + 1);
  }

  /*We pass color settings to css through the html as vars on the 
  'month-container' element*/
  return (
    <div className='month-container' style={{ "--tooltip-color": "red" }}>
      <div className='month-name'>{monthTxt}</div>
      <div className='month-days'>
        <div className='month-week-day'>
          <span className='month-week-day-txt'>S</span>
          <span className='month-week-day-tip'>Sunday</span>
        </div>
        <div className='month-week-day'>
          <span className='month-week-day-txt'>M</span>
          <span className='month-week-day-tip'>Monday</span>
        </div>
        <div className='month-week-day'>
          <span className='month-week-day-txt'>T</span>
          <span className='month-week-day-tip'>Tuesday</span>
        </div>
        <div className='month-week-day'>
          <span className='month-week-day-txt'>W</span>
          <span className='month-week-day-tip'>Wednesday</span>
        </div>
        <div className='month-week-day'>
          <span className='month-week-day-txt'>T</span>
          <span className='month-week-day-tip'>Thursday</span>
        </div>
        <div className='month-week-day'>
          <span className='month-week-day-txt'>F</span>
          <span className='month-week-day-tip'>Friday</span>
        </div>
        <div className='month-week-day'>
          <span className='month-week-day-txt'>S</span>
          <span className='month-week-day-tip'>Saturday</span>
        </div>
        {dtArr.map((el) => (
          <div
            className={`month-day ${
              el.month == m ? "cur-month-day" : "neighbor-month-day"
            }`}
            style={{
              color: el.rating && dailyRColor["r" + el.rating],
              borderColor: el.erosion && erosionColor,
            }}
            data-date={`${el.year}-${el.month}-${el.day}`}
            data-erosion={el.erosion}
            data-rating={el.rating}
            key={`${el.year}-${el.month}-${el.day}`}
            onDoubleClick={() => goToMulti(el)}
          >
            {parseInt(el.day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
