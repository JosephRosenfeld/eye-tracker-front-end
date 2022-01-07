import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

//component imports
import DateViewer from "./DateViewer";

/*--- Actions Imports ---*/
import { changePage } from "../redux/actions/pageActions";

const Header = () => {
  const dispatch = useDispatch();

  /*--- Period Drop Down Config ---*/
  //initializing menu toggle state to false
  const [isOpen, setIsOpen] = useState(false);
  //declaring ref to be used in outside click function
  const dropdownRef = useRef();
  const dropOptionsRef = useRef();
  //Adding event listener for outside clicks on document
  useEffect(() => {
    let handler = (event) => {
      if (
        dropOptionsRef.current &&
        !dropOptionsRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);
  //defining jsx click handler
  const toggleMenuDropdown = () => {
    setIsOpen(!isOpen);
  };

  /*--- Pulling Page from Global Store ---*/
  //And updating it if sent here via redirect
  let page = useSelector((state) => state.page);
  const loc = useLocation();
  if (page != loc.pathname) {
    dispatch(changePage(loc.pathname));
    page = loc.pathname;
  }
  //Seperate just the view
  const view = loc.pathname.match(/^\/[^\/]*/)[0];

  return (
    <header className='header'>
      <div className='header-left'>
        <img className='logo' src='/assets/eye-tracker-logo.png'></img>
        <div className='site-title'>Eye Tracker</div>
        <DateViewer dateVisible={true} view={view} />
      </div>

      <div className='header-right'>
        <div className='header-icon-container'>
          <span className='material-icons header-icon'>add_box</span>
          <span className='header-icon-tip'>Add</span>
        </div>
        <div className='header-icon-container'>
          <span className='material-icons header-icon'>notifications</span>
          <span className='header-icon-tip'>Reminders</span>
        </div>
        <div className='header-icon-container'>
          <span className='material-icons header-icon'>help</span>
          <span className='header-icon-tip'>Help</span>
        </div>
        <Link to={`${view}/settings`} className='header-icon-container'>
          <span className='material-icons header-icon'>settings</span>
          <span className='header-icon-tip'>Settings</span>
        </Link>
        <div className='dropdown-container'>
          <div
            ref={dropdownRef}
            className='period-dropdown'
            onClick={toggleMenuDropdown}
          >
            {view.substring(1).charAt(0).toUpperCase() +
              view.substring(1).slice(1)}
          </div>

          {isOpen && (
            <div ref={dropOptionsRef} className='period-options'>
              <Link to='/year'>
                <div className='period-option' onClick={toggleMenuDropdown}>
                  Year
                </div>
              </Link>
              <Link to='week'>
                <div className='period-option' onClick={toggleMenuDropdown}>
                  Week
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
