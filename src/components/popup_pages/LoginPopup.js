import "./LoginPopup.css";

/*--- Utilities Imports ---*/
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/*--- Hooks Imports ---*/
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

/*--- Components Imports ---*/
import TextField from "@mui/material/TextField";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34af4e",
    },
  },
});

const LoginPopup = ({ redirect = false }) => {
  const [pin, setPin] = useState("");

  //Varients obj to vary animation based on screen width
  const inWidth = useSelector((state) => state.screenSize);
  console.log(inWidth);
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
      className='login-page-container'
    >
      <div className='login-page'>
        <div className={!redirect ? "login-header" : "login-header no-x"}>
          <div className='login-title'>Login</div>
          {!redirect && (
            <div className='login-x' onClick={closePopup}>
              <span className='material-icons'>close</span>
            </div>
          )}
        </div>
        <form className='login-content'>
          {redirect && (
            <div className='cheeky-section'>
              {inWidth > 400 ? (
                <div className='cheeky-message'>
                  I'm sorry but I don't quite recognize you...
                </div>
              ) : (
                <div className='cheeky-message'>
                  I'm sorry, I don't think we've met
                </div>
              )}
              <div className='cheeky-q'>Are you an admin or a guest?</div>
            </div>
          )}
          <div className='admin-section'>
            <div className='login-section-title'>Admin:</div>
            <ThemeProvider theme={theme}>
              <TextField
                size={inWidth < 450 ? "small" : ""}
                placeholder='Admin PIN'
              />
            </ThemeProvider>
            <button className='login-button' type='submit'>
              Login
            </button>
          </div>

          {redirect && (
            <div className='guest-section'>
              <div className='login-section-title'>Guest:</div>
              <button className='login-button' type='submit'>
                Continue as guest
              </button>
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default LoginPopup;
