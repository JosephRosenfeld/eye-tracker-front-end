import "./MultiDay.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import FullDay from "../components/FullDay";

const MultiDay = ({ newViewDt = null }) => {
  //Retrieve and Extract Global State Vars
  const page = useSelector((state) => state.page);
  let { year, month, day } = useSelector((state) => state.viewDt);

  //if newViewDt isn't null (didn't navigate here by clicking a yearly link)
  if (newViewDt) {
    year = newViewDt.year;
    month = newViewDt.month;
    day = newViewDt.month;
  }
  //Dispatch action to update state

  //Calculate lookback
  const lookBack = page == "/week" ? 7 : page == "/3day" ? 3 : 3;

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

  //creating array of days
  return (
    <main className='multi-day-container'>
      {/*Some thing for the timeline on the left side*/}
      <div>Header</div>
      <div className='multi-days'>
        <div>Times</div>
        {dtArr.map((el) => (
          <FullDay
            year={el.year}
            month={el.month}
            day={el.day}
            dt={`${el.day}/${el.month + 1}/${el.year}`}
          />
        ))}
      </div>
    </main>
  );
};

export default MultiDay;
