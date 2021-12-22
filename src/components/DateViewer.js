import "./DateViewer.css";
//Redux hooks import
import { useSelector, useDispatch } from "react-redux";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

const DateViewer = () => {
  const viewDt = useSelector((state) => state.viewDt);
  console.log(viewDt);
  const year = viewDt.year;
  const month = viewDt.month;
  const day = viewDt.day;

  const dispatch = useDispatch();

  const changeViewDt = (change) => {
    if (window.location.href.includes("/year")) {
      year += 1 * change;
      //logic for shift
    } else if (window.location.href.includes("/week")) {
      day += 7 * change;
    } else if (window.location.href.includes("/3day")) {
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

  return (
    <div className='date-viewer'>
      <div className='left-arrow' onClick={() => changeViewDt(-1)}>
        <span class='material-icons'>chevron_left</span>
      </div>
      <div className='view-date'>{`${month + 1}-${day}-${year}`}</div>
      <div className='right-arrow' onClick={() => changeViewDt(1)}>
        <span class='material-icons'>chevron_right</span>
      </div>
    </div>
  );
};

export default DateViewer;
