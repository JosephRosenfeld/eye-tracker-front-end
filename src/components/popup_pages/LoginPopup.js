import "./LoginPopup.css";

/*--- Utilities Imports ---*/
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/*--- Hooks Imports ---*/
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

/*--- Components Imports ---*/
import TextField from "@mui/material/TextField";

/*--- Actions Imports ---*/
import { login } from "../../redux/actions/authActions";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34af4e",
    },
  },
});

const LoginPopup = ({ showExtraProp }) => {
  console.log("render login");

  //setting showExtra val
  /*We store it as a state var so that its set once at initial render and doesn't
  change per each component update (like props would)*/
  const [showExtra, setShowExtra] = useState(showExtraProp);

  //Handle rerender after login click
  const [clickedLogIn, setClickedLogIn] = useState(false);
  const [haveNavigated, setHaveNavigated] = useState(false);
  const auth = useSelector((state) => state.auth);
  const loc = useLocation();
  const view = loc.pathname.match(/^\/[^\/]*/)[0]; //get cur view
  const navigate = useNavigate();
  useEffect(() => {
    if (clickedLogIn && auth.loggedIn && !haveNavigated) {
      setHaveNavigated(true);
      navigate(view, {
        replace: true,
      });
    }
  });

  /*--- Handle Click Function ---*/
  const dispatch = useDispatch();
  /*Setting the form error field is so we know where to display the error message,
  this is only useful for server based validation, as the guest route won't have 
  any client side validation (its just a button click)*/
  const [formErrorField, setFormErrorField] = useState(null);
  const [clientSideErrors, setClientSideErrors] = useState({});
  const allErrors = useRef({});
  const handleClick = (e) => {
    setClickedLogIn(true);
    //Whenever we click a button, erase all pre-existing errors
    allErrors.current = {};
    if (e.target.className.includes("admin-button")) {
      setFormErrorField("admin");
      //check for client side errors first
      const errors = validate(pin);
      console.log(errors);
      setClientSideErrors(errors);
      if (Object.keys(errors).length !== 0) {
        return; //Escape click handler so we don't dispatch to redux
      }
    } else if (e.target.className.includes("guest-button")) {
      setFormErrorField("guest");
    }
    dispatch(login());
  };

  /*--- Set PIN Form Field ---*/
  const [pin, setPin] = useState("");
  const onChange = (e) => {
    let { value } = e.target;
    setPin(value);
    /*If we/ve already tried to submit and the edit was on a text input then
      update the form errors shown*/
    if (clickedLogIn) {
    }
  };

  /*--- Client Side PIN Validation ---*/
  const validate = (pin) => {
    const errors = {};
    const fourNumsReg = /^\d\d\d\d$/;

    if (pin == "") {
      errors.pin = "This field is required for Admin login";
    } else if (!fourNumsReg.test(pin)) {
      errors.pin = "PIN must be exactly four digits";
    }
    return errors;
  };

  /*--- Set allErrors State---*/
  //Set based on global auth state and local clientSideErrors state
  allErrors.current = {
    admin:
      formErrorField == "admin" && !auth.isLoading
        ? clientSideErrors.pin || auth.errorMessage
        : "",
    guest:
      formErrorField == "guest" && !auth.isLoading ? auth.errorMessage : "",
  };

  console.log(allErrors.current);
  //Varients obj to vary animation based on screen width
  const inWidth = useSelector((state) => state.screenSize);
  const variants = {
    hidden_desktop: { opacity: 0, y: "-30px" },
    hidden_mobile: { opacity: 1, y: "100%" },
    shown: { opacity: 1, y: "0%" },
    exit_desktop: { opacity: 0, y: "30px" },
    exit_mobile: { opacity: 1, y: "100%" },
  };

  //Close popup func (never keep in stack trace)
  const closePopup = () => {
    navigate(view, {
      replace: true,
    });
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
        <div className={!showExtra ? "login-header" : "login-header no-x"}>
          <div className='login-title'>Login</div>
          {!showExtra && (
            <div className='login-x' onClick={closePopup}>
              <span className='material-icons'>close</span>
            </div>
          )}
        </div>
        <form className='login-content'>
          {showExtra && (
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
                placeholder='Admin PIN  ex: 1234'
                onChange={onChange}
                disabled={auth.isLoading}
                data-error={clientSideErrors.pin}
              />
            </ThemeProvider>
            <span className='error-txt'>{allErrors.current.admin}</span>
            <button
              className={`login-button admin-button ${
                auth.isLoading && "disabled"
              }`}
              type='button'
              onClick={(e) => {
                handleClick(e);
              }}
              disabled={auth.isLoading}
            >
              Login
            </button>
          </div>

          {showExtra && (
            <div className='guest-section'>
              <div className='login-section-title'>Guest:</div>
              <button
                className={`login-button guest-button ${
                  auth.isLoading && "disabled"
                }`}
                type='button'
                onClick={(e) => {
                  handleClick(e);
                }}
                disabled={auth.isLoading}
              >
                Continue as guest
              </button>
              <span className='error-txt'>{allErrors.current.guest}</span>
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default LoginPopup;
