import "./Header.css";
import { useSelector, useDispatch } from "react-redux";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

const Header = () => {
  const viewDt = useSelector((state) => state.viewDt);
  console.log(viewDt);
  let year = viewDt.year;
  let month = viewDt.month;
  let day = viewDt.day;
  const dispatch = useDispatch();

  const changeViewDt = (change) => {
    //We don't use react router location because the router isn't in charge
    //of rendering the header component

    //convert viewDtStr into dt object

    if (window.location.href.includes("/year")) {
      year += 1 * change;
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
      })
    );
  };

  return (
    <header className='header'>
      <div className='title header-el'>Joseph's Eye Tracker</div>
      <div className='left-arrow' onClick={() => changeViewDt(-1)}>
        <i className='fas fa-arrow-circle-left'></i>
      </div>
      <div>{`${month + 1}-${day}-${year}`}</div>
      <div className='right-arrow' onClick={() => changeViewDt(1)}>
        <i className='fas fa-arrow-circle-right'></i>
      </div>

      <div className='header-el'>
        {/*BAck button*/}

        {/*Forward button*/}
      </div>
      <div className='icons header-el'>Icons</div>
    </header>
  );
};

export default Header;
