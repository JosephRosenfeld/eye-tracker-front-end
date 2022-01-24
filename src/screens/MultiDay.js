import "./MultiDay.css";

/*--- Utilities Imports ---*/

/*--- Hook Imports ---*/
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/*--- Component Imports ---*/
import MultiHeader from "../components/MultiHeader";
import TimeScale from "../components/TimeScale";
import FullDay from "../components/FullDay";
import { Outlet, useNavigate } from "react-router-dom";

/*--- Action Imports ---*/

const MultiDay = ({ newViewDt = null, redirect = false }) => {
  /*We use a ref here so that if view changes to some non multi-day val (like if we
    switch to a year view) then it doesn't rerender the wrong amount of days right
    before switching to the new view */
  const loc = useLocation();
  const viewRef = useRef(loc.pathname.match(/^\/[^\/]*/)[0]);
  let view = loc.pathname.match(/^\/[^\/]*/)[0];
  if (view != "/3day" && view != "/week") {
    view = viewRef.current;
  }

  //Retrieve and Extract Global State Vars
  let { year, month, day } = useSelector((state) => state.viewDt);
  //if newViewDt isn't null overwrite our local view date
  //(Update of global viewDt happened in the double click function on the Yearly)
  if (newViewDt) {
    year = newViewDt.year;
    month = newViewDt.month;
    day = newViewDt.month;
  }

  //Calculate lookback
  const lookBack = view == "/week" ? 7 : view == "/3day" ? 3 : 3;

  //Creating dtArr
  const dtArr = new Array(lookBack);
  let pointerDt = new Date(year, month, day - lookBack + 1);
  for (let i = 0; i < dtArr.length; i++) {
    dtArr[i] = {
      year: pointerDt.getFullYear(),
      month: pointerDt.getMonth(),
      day: pointerDt.getDate(),
    };
    pointerDt.setDate(pointerDt.getDate() + 1);
  }

  return (
    <main className='multi-day-container'>
      <MultiHeader dtArr={dtArr} />
      <div className='multi-day-and-time'>
        <TimeScale />
        <div className='multi-days'>
          {dtArr.map((el, i) => (
            <FullDay
              year={el.year}
              month={el.month}
              day={el.day}
              first={i == 0}
              key={"" + el.day + el.month + el.year}
              data-key={"" + el.day + el.month + el.year}
            />
          ))}
        </div>
      </div>
      <Outlet />
    </main>
  );
};

export default MultiDay;
