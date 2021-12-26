import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changePage } from "../redux/actions/pageActions";

//component imports
import DateViewer from "./DateViewer";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

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
  });

  const toggleMenuDropdown = () => {
    setIsOpen(!isOpen);
  };

  /*--- Pulling Page from Global Store ---*/
  const dispatch = useDispatch();
  const setPageEventListener = () => {
    console.log("we are firing");
    dispatch(changePage(window.location.pathname));
  };
  useEffect(() => {
    console.log("added event listener");
    window.addEventListener("locationchange", setPageEventListener);
    return () =>
      window.removeEventListener("locationchange", setPageEventListener);
  }, []);
  const page = useSelector((state) => state.page);
  console.log(page);

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
            {/*page.charAt(0).toUpperCase() + page.slice(1)*/}
            {page}
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
