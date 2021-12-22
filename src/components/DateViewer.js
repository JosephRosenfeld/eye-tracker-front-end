import "./DateViewer.css";
//Redux hooks import
import { useSelector, useDispatch } from "react-redux";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

const DateViewer = () => {
  //Retrieve and extract view date values
  const viewDt = useSelector((state) => state.viewDt);
  let year = viewDt.year;
  let month = viewDt.month;
  let day = viewDt.day;
  const tempDt = new Date(year, month, day);
  const monthTxt = tempDt.toLocaleString("en-us", { month: "long" });
  console.log(monthTxt);

  //Figure out what view is displayed
  const page = window.location.href.includes("/year")
    ? "year"
    : window.location.href.includes("/week")
    ? "week"
    : window.location.href.includes("/3day")
    ? "3day"
    : null;

  //initialize dispatch
  const dispatch = useDispatch();

  const changeViewDt = (change) => {
    if (page == "year") {
      year += 1 * change;
    } else if (page == "week") {
      day += 7 * change;
    } else if ((page = "3day")) {
      day += 3 * change;
    }

    let newDt = new Date(year, month, day);
    console.log(newDt.getFullYear(), newDt.getMonth(), newDt.getDate());
    dispatch(
      changeDt({
        year: newDt.getFullYear(),
        month: newDt.getMonth(),
        day: newDt.getDate(),
        increase: change > 0,
      })
    );
  };

  //Formate shown date
  const shownDate = page == "year" ? year : monthTxt;

  return (
    <div className='date-viewer'>
      <span
        className='left-arrow material-icons'
        onClick={() => changeViewDt(-1)}
      >
        chevron_left
      </span>
      <div className='view-date'>{shownDate}</div>
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
