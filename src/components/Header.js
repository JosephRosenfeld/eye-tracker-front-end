import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//component imports
import DateViewer from "./DateViewer";

//actions import
import { changeDt } from "../redux/actions/viewDateActions";

const Header = () => {
  //Figure out what view is displayed
  const page = window.location.href.includes("/year")
    ? "year"
    : window.location.href.includes("/week")
    ? "week"
    : window.location.href.includes("/3day")
    ? "3day"
    : null;

  //initializing menu toggle state to false
  const [isOpen, setIsOpen] = useState(false);

  //declaring ref to be used in outside click function
  const dropdownRef = useRef();
  const dropOptionsRef = useRef();

  //Adding event listener for outside clicks on document
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (
        dropOptionsRef.current &&
        !dropOptionsRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    });
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
        {/*
        <div className='plus-icon'>
          <img src='/assets/collapse-plus.svg'></img>
        </div>*/}
        <span class='material-icons add-icon'>add</span>
        <span className='material-icons'>help_outline</span>
        <span className='material-icons'>settings</span>
        <div className='reminders'>Reminders</div>

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
                <div className='period-option'>Year</div>
              </Link>
              <Link to='week'>
                <div className='period-option'>Week</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
