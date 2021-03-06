import "./Header.css";

/*--- Hooks Imports ---*/
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

/*--- Components Imports ---*/
import DateViewer from "./DateViewer";

/*--- Actions Imports ---*/

const Header = () => {
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

  /*--- Getting Current View ---*/
  const loc = useLocation();
  const view = loc.pathname.match(/^\/[^\/]*/)[0];

  return (
    <header className='header'>
      <div className='header-left'>
        {/* Using an a tag here because we want the page to refresh on click */}
        <a href='/year' className='brand-home-link'>
          <img className='logo' src='/assets/eye_tracker_logo.png'></img>
          <div className='site-title'>Eye Tracker</div>
        </a>
        <DateViewer dateVisible={true} view={view} />
      </div>
      <div className='header-right'>
        <Link to={`${view}/add`} replace className='header-icon-container'>
          <span className='material-icons header-icon'>add_box</span>
          <span className='header-icon-tip'>Add Item</span>
        </Link>
        {/* <Link
          to={`${view}/reminders`}
          replace
          className='header-icon-container'
        >
          <span className='material-icons header-icon'>notifications</span>
          <span className='header-icon-tip'>Reminders</span>
        </Link> */}

        <Link to={`${view}/info`} replace className='header-icon-container'>
          <span className='material-icons header-icon'>help</span>
          <span className='header-icon-tip'>Information</span>
        </Link>
        <Link to={`${view}/settings`} replace className='header-icon-container'>
          <span className='material-icons header-icon'>settings</span>
          <span className='header-icon-tip'>Settings</span>
        </Link>
        {/* Should I replace or not below */}
        <Link
          className='header-icon-container'
          to={`${view}/login`}
          replace
          state={{ redirect: false }}
        >
          <span className='material-icons header-icon'>account_circle</span>
          <span className='header-icon-tip'>Login</span>
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
              <Link to='year'>
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
