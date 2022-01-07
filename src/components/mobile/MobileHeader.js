import "./MobileHeader.css";

/*--- Hooks Imports ---*/
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/*--- Component Imports ---*/
import DateViewer from "../DateViewer";
import MobileSidePanel from "./MobileSidePanel";

/*--- Action Imports ---*/
import { changePage } from "../../redux/actions/pageActions";
import { AnimatePresence, motion } from "framer-motion";

const MobileHeader = () => {
  const dispatch = useDispatch();
  const inWidth = useSelector((state) => state.screenSize);

  /*--- Correcting Page Var if Redirected Here ---*/
  const loc = useLocation();
  let page = useSelector((state) => state.page);
  if (page != loc.pathname) {
    dispatch(changePage(loc.pathname));
    page = loc.pathname;
  }
  //Seperate just the view
  const view = loc.pathname.match(/^\/[^\/]*/)[0];

  /*--- Period Drop Down Config ---*/
  //initializing side panel toggle state to false
  const [isSpOpen, setIsSpOpen] = useState(false);
  //declaring ref to be used in outside click function
  const sidePanelRef = useRef();
  const menuRef = useRef();

  //Adding event listener for outside clicks on document
  useEffect(() => {
    let handler = (event) => {
      if (
        sidePanelRef.current &&
        !sidePanelRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsSpOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  /*--- Framer Motion Setup for Transitions ---*/

  //Defining animated react component

  return (
    <header className='mobile-header'>
      <div className='mobile-header-left'>
        <img className='logo' src='/assets/eye-tracker-logo.png'></img>
        {inWidth > 450 && <div className='site-title'>Eye Tracker</div>}
        <DateViewer dateVisible={true} view={view} />
      </div>
      <div
        ref={menuRef}
        className='menu-icon-container'
        onClick={() => setIsSpOpen(true)}
      >
        <span className='material-icons menu-icon'>menu</span>
      </div>
      <AnimatePresence>
        {isSpOpen && (
          <>
            <MobileSidePanel
              ref={sidePanelRef}
              setIsSpOpen={setIsSpOpen}
              view={view}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MobileHeader;
