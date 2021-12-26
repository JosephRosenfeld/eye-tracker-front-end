import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

//component imports
import DateViewer from "./DateViewer";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

const Header = () => {
  //Figure out what view is displayed
  /*This is using a state variable and an event listener because when you navigate to
    a url that redirects you, the header will still initially render with the old invalid
    url. By putting the location url into a state variable, we guarentee that the header
    will rerender once the location changes (after redirect)*/
  const location = useLocation(); //get location obj
  const [page, setPage] = useState(location.pathname);
  console.log(page);

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
  });

  const toggleMenuDropdown = () => {
    setIsOpen(!isOpen);
    console.log("react event listener toggle ran");
  };

  return (
    <header className='header'>
      <div className='header-left'>
        <img className='logo' src='/assets/eye-tracker-logo.png'></img>
        <div className='site-title'>Eye Tracker</div>
        <DateViewer />
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
        <div className='header-icon-container'>
          <span className='material-icons header-icon'>settings</span>
          <span className='header-icon-tip'>Settings</span>
        </div>
        <div className='dropdown-container'>
          <div
            ref={dropdownRef}
            className='period-dropdown'
            onClick={toggleMenuDropdown}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
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
