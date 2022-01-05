import "./MultiDay.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";

/*--- Component Imports ---*/
import MultiHeader from "../components/MultiHeader";
import TimeScale from "../components/TimeScale";
import FullDay from "../components/FullDay";

const MultiDay = ({ newViewDt = null }) => {
  //Retrieve and Extract Global State Vars
  const page = useSelector((state) => state.page);
  console.log(page);
  let { year, month, day } = useSelector((state) => state.viewDt);

  //if newViewDt isn't null overwrite our local view date
  //(Update of global viewDt happened in the double click function on the Yearly)
  if (newViewDt) {
    year = newViewDt.year;
    month = newViewDt.month;
    day = newViewDt.month;
  }

  //Calculate lookback
  const lookBack = page == "/week" ? 7 : page == "/3day" ? 3 : 3;

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
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MultiDay;
