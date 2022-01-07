import "./MultiDay.css";

/*--- Hook Imports ---*/
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/*--- Component Imports ---*/
import MultiHeader from "../components/MultiHeader";
import TimeScale from "../components/TimeScale";
import FullDay from "../components/FullDay";
import { Outlet } from "react-router-dom";

/*--- Action Imports ---*/

const MultiDay = ({ newViewDt = null }) => {
  const loc = useLocation();
  const view = loc.pathname.match(/^\/[^\/]*/)[0];

  //Retrieve and Extract Global State Vars
  /*const page = useSelector((state) => state.page);*/
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
