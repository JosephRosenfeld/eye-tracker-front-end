import "./Header.css";
import DateViewer from "./DateViewer";
import { useSelector, useDispatch } from "react-redux";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

const Header = () => {
  return (
    <header className='header'>
      <div className='header-left'>
        <div className='logo'></div>
        <div className='site-title'>Joseph's Eye Tracker</div>
        <DateViewer />
      </div>

      <div className='header-right'>
        <div>
          <span class='material-icons'>help_outline</span>
        </div>
        <div>
          <span class='material-icons'>settings</span>
        </div>
        <div>
          <span class='material-icons'>add_circle_outline</span>
        </div>
        <div>Reminders</div>
        <div>Drop down</div>
      </div>
    </header>
  );
};

export default Header;
