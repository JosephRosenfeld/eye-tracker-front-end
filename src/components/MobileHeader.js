import "./MobileHeader.css";

/*--- Hooks Imports ---*/
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/*--- Component Imports ---*/
import DateViewer from "./DateViewer";

/*--- Action Imports ---*/
import { changePage } from "../redux/actions/pageActions";

const MobileHeader = () => {
  const dispatch = useDispatch();
  const loc = useLocation();
  let page = useSelector((state) => state.page);
  if (page != loc.pathname) {
    dispatch(changePage(loc.pathname));
    page = loc.pathname;
    console.log("page changed");
  }
  const inWidth = useSelector((state) => state.screenSize);

  return (
    <header className='mobile-header'>
      <div className='mobile-header-left'>
        <img className='logo' src='/assets/eye-tracker-logo.png'></img>
        {inWidth > 450 && <div className='site-title'>Eye Tracker</div>}
        <DateViewer dateVisible={true} page={page} />
      </div>
      <div className='menu-icon-container'>
        <span className='material-icons menu-icon'>menu</span>
      </div>
    </header>
  );
};

export default MobileHeader;
