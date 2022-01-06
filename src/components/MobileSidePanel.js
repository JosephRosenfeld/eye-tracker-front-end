import "./MobileSidePanel.css";

/*--- Component Imports ---*/
import { Link } from "react-router-dom";

const MobileSidePanel = () => {
  //Define onclick function

  return (
    <div className='mobile-side-panel'>
      <Link to='/year' className='mobile-sp-item mobile-sp-title'>
        <img className='logo' src='/assets/eye-tracker-logo.png'></img>
        <div className='site-title'>Eye Tracker</div>
      </Link>
      <Link to='/3day' className='mobile-sp-item mobile-sp-view'>
        3 Day
        <span class='material-icons-outlined'>view_week</span>
      </Link>
      <Link to='/year' className='mobile-sp-item mobile-sp-view'>
        Year
        <span class='material-icons-outlined'>calendar_view_month</span>
      </Link>
      <div className='mobile-sp-item mobile-sp-utility'>
        Add
        <span className='material-icons'>add_box</span>
      </div>
      <div className='mobile-sp-item mobile-sp-utility'>
        Reminders
        <span className='material-icons'>notifications</span>
      </div>
      <div className='mobile-sp-item mobile-sp-utility'>
        Help
        <span className='material-icons'>help</span>
      </div>
      <div className='mobile-sp-item mobile-sp-utility'>
        Settings
        <span className='material-icons'>settings</span>
      </div>
    </div>
  );
};

export default MobileSidePanel;
