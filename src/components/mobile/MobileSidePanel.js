import "./MobileSidePanel.css";

/*--- Utilities Imports ---*/
import { forwardRef } from "react";
import { motion } from "framer-motion";

/*--- Hooks Imports ---*/
import { useSelector } from "react-redux";

/*--- Component Imports ---*/
import { Link } from "react-router-dom";

const MobileSidePanel = forwardRef(({ setIsSpOpen, page }, ref) => {
  //Define onclick function
  const spOnClick = (page = null) => {
    //set isSpOpen to false
    setIsSpOpen(false);

    //If its a header page, activate that
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
          duration: ".5",
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
          onClick={spOnClick}
        >
          <img className='logo' src='/assets/text_color_logo.png'></img>
          <div className='site-title'>Eye Tracker</div>
        </Link>
        <Link
          to='/3day'
          className={
            page == "/3day"
              ? "mobile-sp-item mobile-sp-view sp-active"
              : "mobile-sp-item mobile-sp-view"
          }
          onClick={spOnClick}
        >
          3 Day
          <span className='material-icons-outlined'>view_week</span>
        </Link>
        <Link
          to='/year'
          className={
            page == "/year"
              ? "mobile-sp-item mobile-sp-view sp-active"
              : "mobile-sp-item mobile-sp-view"
          }
          onClick={spOnClick}
        >
          Year
          <span className='material-icons-outlined'>calendar_view_month</span>
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
      </motion.div>
      <motion.div
        className='overlay'
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.4,
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
