import "./MobileSidePanel.css";

/*--- Utilities Imports ---*/
import { forwardRef } from "react";
import { motion } from "framer-motion";

/*--- Hooks Imports ---*/
import { useSelector } from "react-redux";
import { useState } from "react";

/*--- Component Imports ---*/
import { Link } from "react-router-dom";

/*With Framer Motion
const MobileSidePanel = forwardRef(({ setIsSpOpen, view }, ref) => {*/
const MobileSidePanel = forwardRef(({ setIsSpOpen, view }, ref) => {
  console.log("side panel rerender");

  //Define onclick function
  const spOnClick = (pause = false) => {
    //Pause to let delay go
    let delay = pause ? 600 : 0;
    setTimeout(() => setIsSpOpen(false), delay);
    //set isSpOpen to false
    //setIsSpOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{
          translateX: "100%",
        }}
        animate={{
          translateX: "0%",
        }}
        transition={{
          type: "spring",
          duration: ".4",
          bounce: 0,
        }}
        exit={{
          translateX: "100%",
        }}
        ref={ref}
        className='mobile-side-panel'
      >
        <Link
          to='/year'
          className='mobile-sp-item mobile-sp-title'
          onClick={() => spOnClick(false)}
        >
          <img className='logo' src='/assets/text_color_logo.png'></img>
          <div className='site-title'>Eye Tracker</div>
        </Link>
        <Link
          to='/3day'
          className={
            view == "/3day"
              ? "mobile-sp-item mobile-sp-view sp-active"
              : "mobile-sp-item mobile-sp-view"
          }
          onClick={() => spOnClick(false)}
        >
          3 Day
          <span className='material-icons-outlined'>view_week</span>
        </Link>
        <Link
          to='/year'
          className={
            view == "/year"
              ? "mobile-sp-item mobile-sp-view sp-active"
              : "mobile-sp-item mobile-sp-view"
          }
          onClick={() => spOnClick(false)}
        >
          Year
          <span className='material-icons-outlined'>calendar_view_month</span>
        </Link>
        <Link
          to={`${view}/add`}
          className='mobile-sp-item mobile-sp-utility'
          onClick={() => spOnClick(true)}
        >
          Add
          <span className='material-icons'>add_box</span>
        </Link>
        <Link
          to={`${view}/reminders`}
          className='mobile-sp-item mobile-sp-utility'
          onClick={() => spOnClick(true)}
        >
          Reminders
          <span className='material-icons'>notifications</span>
        </Link>
        <Link
          to={`${view}/info`}
          className='mobile-sp-item mobile-sp-utility'
          onClick={() => spOnClick(true)}
        >
          Info
          <span className='material-icons'>help</span>
        </Link>
        <Link
          to={`${view}/settings`}
          className='mobile-sp-item mobile-sp-utility'
          onClick={() => spOnClick(true)}
        >
          Settings
          <span className='material-icons'>settings</span>
        </Link>
      </motion.div>
      <motion.div
        className='sp-overlay'
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: "tween",
          duration: 0.5,
        }}
        exit={{
          opacity: 0,
        }}
      ></motion.div>
    </>
  );
});

export default MobileSidePanel;
