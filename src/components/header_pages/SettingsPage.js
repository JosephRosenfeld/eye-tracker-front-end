import "./SettingsPage.css";

/*--- Utilities Imports ---*/
import { motion } from "framer-motion";

/*--- Hooks Imports ---*/
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const SettingsPage = () => {
  const loc = useLocation();

  //Varients to vary on screen width
  const inWidth = useSelector((state) => state.screenSize);
  const variants = {
    hidden_desktop: { opacity: 0, y: "-30px" },
    hidden_mobile: { opacity: 1, y: "100%" },
    shown: { opacity: 1, y: "0%" },
    exit_desktop: { opacity: 0, y: "30px" },
    exit_mobile: { opacity: 1, y: "100%" },
  };
  const view = loc.pathname.match(/^\/[^\/]*/)[0];

  const navigate = useNavigate();

  const closePopup = () => {
    //Remove from history
    //navigate elsewhere
    /*On mobile its essentially a new page so its good behavior for it to be stored
    in history (not replaced), however on desktop its basically just a popup and therefore
    should be replaced in the history stack*/
    navigate(view, { replace: inWidth > 800 ? true : false });
  };

  return (
    <>
      <motion.div
        initial={inWidth > 800 ? "hidden_desktop" : "hidden_mobile"}
        animate={"shown"}
        exit={inWidth > 800 ? "exit_desktop" : "exit_mobile"}
        transition={{
          duration: inWidth > 800 ? 0.2 : 0.4,
        }}
        variants={variants}
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
