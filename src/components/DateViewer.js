import "./DateViewer.css";
//Redux hooks import
import { useSelector, useDispatch } from "react-redux";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

const DateViewer = ({ dateVisible, view }) => {
  //Retrieve and extract global state vars
  const viewDt = useSelector((state) => state.viewDt);
  let { year, month, day } = viewDt;
  console.log(view);

  /*--- Calculate showDate ---*/
  /*If we're on yearly display ex: < 2021 >
    If we're on multi-day display ex: Dec 2021*/
  let showDate;
  if (view == "/year") {
    showDate = year;
  } else if (view == "/week" || view == "/3day") {
    const curDt = new Date(year, month, day); //define dt obj to get its month
    showDate = `${curDt.toLocaleString("en-us", { month: "short" })} ${year}`;

    /*Google Calendar Date View Replication*/
    /*const lookBack = view == "/week" ? 7 : 3;
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
    if (view == "/year") {
      year += 1 * change;
    } else if (view == "/week") {
      day += 7 * change;
    } else if (view == "/3day") {
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
      data-period={view.substring(1)}
      data-month={month}
    >
      <span
        className='left-arrow material-icons'
        onClick={() => changeViewDt(-1)}
      >
        chevron_left
      </span>
      {dateVisible && <div className='view-date'>{showDate}</div>}
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
