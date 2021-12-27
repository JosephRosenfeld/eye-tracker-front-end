import "./DateViewer.css";
//Redux hooks import
import { useSelector, useDispatch } from "react-redux";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

const DateViewer = () => {
  //Retrieve and extract global state vars
  const viewDt = useSelector((state) => state.viewDt);
  let { year, month, day } = viewDt;
  const page = useSelector((state) => state.page);

  /*--- Calculate showDate ---*/
  /*If we're on yearly display ex: < 2021 >
    If we're on multi-day display ex: December 2021
    If we're on multi-day and view overlaps two months ex: Nov - Dec 2021
    If we're on multi-day and view overlaps two years ex: Dec 2021 - Jan 2022*/
  let showDate;
  if (page == "/year") {
    showDate = year;
  } else if (page == "/week" || page == "/3day") {
    const curDt = new Date(year, month, day); //define dt obj to get its month
    showDate = `${curDt.toLocaleString("en-us", { month: "short" })} ${year}`;

    /*Google Calendar Date View Replication*/
    /*const lookBack = page == "/week" ? 7 : 3;
    const prevDt = new Date(year, month, day - lookBack);
    if (prevDt.getFullYear() != year) {
      showDate = `${prevDt.toLocaleString("en-us", {
        month: "short",
      })} ${prevDt.getFullYear()} - ${curDt.toLocaleString("en-us", {
        month: "short",
      })} ${year}`;
    } else if (prevDt.getMonth() != month) {
      showDate = `${prevDt.toLocaleString("en-us", {
        month: "short",
      })} - ${curDt.toLocaleString("en-us", { month: "short" })} ${year}`;
    } else {
      showDate = `${curDt.toLocaleString("en-us", { month: "long" })}`;
    }*/
  }

  //initialize dispatch
  const dispatch = useDispatch();

  //date viewer on click handler
  const changeViewDt = (change) => {
    if (page == "/year") {
      year += 1 * change;
    } else if (page == "/week") {
      day += 7 * change;
    } else if (page == "/3day") {
      day += 3 * change;
    }

    let newDt = new Date(year, month, day);
    dispatch(
      changeDt({
        year: newDt.getFullYear(),
        month: newDt.getMonth(),
        day: newDt.getDate(),
      })
    );
  };

  return (
    <div
      className='date-viewer'
      data-period={page.substring(1)}
      data-month={month}
    >
      <span
        className='left-arrow material-icons'
        onClick={() => changeViewDt(-1)}
      >
        chevron_left
      </span>
      <div className='view-date'>{showDate}</div>
      <span
        className='right-arrow material-icons'
        onClick={() => changeViewDt(1)}
      >
        chevron_right
      </span>
    </div>
  );
};

export default DateViewer;
