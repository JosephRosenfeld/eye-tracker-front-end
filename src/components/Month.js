import "./Month.css";
import { useSelector } from "react-redux";

const Month = ({ m }) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //get view date
  const viewDt = useSelector((state) => state.viewDt);
  const year = viewDt.year;

  //get month start sunday
  let firstOfMonth = new Date(year, m, 1);
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
    };
    if (dtArr[i]) pointerDt.setDate(pointerDt.getDate() + 1);
  }
  //get view date somehow.
  return (
    <div className='month-container'>
      <div className='month-name'>{months[m]}</div>
      <div className='month-days'>
        <div className='month-week-day' data-tip='Sunday'>
          S
        </div>
        <div className='month-week-day' data-tip='Monday'>
          M
        </div>
        <div className='month-week-day' data-tip='Tuesday'>
          T
        </div>
        <div className='month-week-day' data-tip='Wednesday'>
          W
        </div>
        <div className='month-week-day' data-tip='Thursday'>
          T
        </div>
        <div className='month-week-day' data-tip='Friday'>
          F
        </div>
        <div className='month-week-day' data-tip='Saturday'>
          S
        </div>
        {dtArr.map((el) => (
          <div
            className={`month-day ${
              el.month == m ? "cur-month-day" : "neighbor-month-day"
            }`}
            date={`${el.year}-${el.month}-${el.day}`}
          >
            {parseInt(el.day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
