import "./MobileHeader.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//component imports
import DateViewer from "./DateViewer";

const Header = () => {
  const inWidth = useSelector((state) => {
    return state.screenSize;
  });

  return (
    <header className='mobile-header'>
      <div className='mobile-header-left'>
        <img className='logo' src='/assets/eye-tracker-logo.png'></img>
        {inWidth > 450 && <div className='site-title'>Eye Tracker</div>}
        <DateViewer dateVisible={true} />
      </div>
      <div className='menu-icon-container'>
        <span className='material-icons menu-icon'>menu</span>
      </div>
    </header>
  );
};

export default Header;
