import "./PopupPage.css";

/*--- Utilities Imports ---*/
import { motion } from "framer-motion";

/*--- Hooks Imports ---*/
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

/*--- Components Imports ---*/
import AddSubPage from "./AddSubPage";
import RemindersSubPage from "./RemindersSubPage";
import InfoSubPage from "./InfoSubPage";
import SettingsSubPage from "./SettingsSubPage";

const PopupPage = ({ title }) => {
  //Varients obj to vary animation based on screen width
  const inWidth = useSelector((state) => state.screenSize);
  const variants = {
    hidden_desktop: { opacity: 0, y: "-30px" },
    hidden_mobile: { opacity: 1, y: "100%" },
    shown: { opacity: 1, y: "0%" },
    exit_desktop: { opacity: 0, y: "30px" },
    exit_mobile: { opacity: 1, y: "100%" },
  };

  //Getting current view
  const loc = useLocation();
  const view = loc.pathname.match(/^\/[^\/]*/)[0];

  //navigating user to new page (with some conditional logic on replace)
  const navigate = useNavigate();
  const closePopup = () => {
    /*On mobile its essentially a new page so its good behavior for it to be stored
    in history (not replaced), however on desktop its basically just a popup and therefore
    should be replaced in the history stack*/
    navigate(view, { replace: inWidth > 800 ? true : false });
  };

  return (
    <motion.div
      initial={inWidth > 800 ? "hidden_desktop" : "hidden_mobile"}
      animate={"shown"}
      exit={inWidth > 800 ? "exit_desktop" : "exit_mobile"}
      transition={{
        duration: inWidth > 800 ? 0.2 : 0.4,
      }}
      variants={variants}
      className='popup-page-container'
    >
      <div className='popup-page'>
        <div className='popup-header'>
          <div className='popup-title'>{title}</div>
          <div className='popup-x' onClick={closePopup}>
            <span className='material-icons'>close</span>
          </div>
        </div>
        {title == "Add Item" ? (
          <AddSubPage />
        ) : title == "Reminders" ? (
          <RemindersSubPage />
        ) : title == "Information" ? (
          <InfoSubPage />
        ) : title == "Settings" ? (
          <SettingsSubPage />
        ) : (
          ""
        )}
      </div>
    </motion.div>
  );
};

export default PopupPage;
