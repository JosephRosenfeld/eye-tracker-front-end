import "./SettingsPage.css";

/*--- Utilities Imports ---*/
import { AnimatePresence, motion } from "framer-motion";

/*--- Hooks Imports ---*/
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

/*--- Components Imports ---*/
import PopupOverlay from "./PopupOverlay.js";

const SettingsPage = () => {
  const loc = useLocation();

  const inWidth = useSelector((state) => state.screenSize);
  const page = useSelector((state) => state.page);
  const view = loc.pathname.match(/^\/[^\/]*/)[0];

  const navigate = useNavigate();

  const closePopup = () => {
    //Remove from history
    //navigate elsewhere
    navigate(view, { replace: true });
  };

  return (
    <>
      <motion.div
        initial={{
          y: "-30px",
          opacity: 0,
        }}
        animate={{
          y: "0px",
          opacity: 1,
        }}
        exit={{
          y: "30px",
          opacity: 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className='settings-page-container'
      >
        <div className='settings-page'>
          <div className='settings-header'>
            <div className='settings-title'>Settings</div>
            <div className='popup-x' onClick={closePopup}>
              <span className='material-icons'>close</span>
            </div>
          </div>
          <div className='settings'></div>
        </div>
      </motion.div>
    </>
  );
};

export default SettingsPage;
