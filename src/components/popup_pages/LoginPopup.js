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
import { loginAdmin } from "../../redux/actions/authActions";
import { loginGuest } from "../../redux/actions/authActions";
import { removeAdminError } from "../../redux/actions/authActions";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34af4e",
    },
  },
});

const LoginPopup = ({ showExtraProp }) => {
  console.log("render login");

  /*--- Setting showExtra Val ---*/
  /*We store it as a state var so that its set once at initial render and doesn't
  change per each component update (like props would)*/
  const [showExtra, setShowExtra] = useState(showExtraProp);

  /*--- Setting / Configuring initial vals ---*/
  //Essentially a 'have saved' state but for each from
  const [adminSubmitted, setAdminSubmitted] = useState(false);
  const [guestSubmitted, setGuestSubmitted] = useState(false);
  //Ensures we don't get stuck in a rerender loop with constant navigation
  const [haveNavigated, setHaveNavigated] = useState(false);
  const auth = useSelector((state) => state.auth);
  const loc = useLocation();
  const view = loc.pathname.match(/^\/[^\/]*/)[0]; //get cur view
  const navigate = useNavigate();

  /*--- Prevent Default on Form Submit ---*/
  const onSubmit = (e) => {
    e.preventDefault();
  };

  /*--- Handle Navigation after Login Click ---*/
  /*Essentially since redux updates are asynchronous (and its better to handle
    them as such), we decided to wait until the global state update triggers
    a rerender, at such time this useEffect will be triggered and then based on
    some internal logic, will decide if we need to reroute*/
  useEffect(() => {
    //Handle admin form
    if (adminSubmitted) {
      if (!haveNavigated && auth.adminLoggedIn) {
        setHaveNavigated(true);
        console.log("before navigate");
        navigate(view, {
          replace: true,
        });
      }

      //Handle guest form
    } else if (guestSubmitted) {
      if (!haveNavigated && auth.guestLoggedIn) {
        setHaveNavigated(true);
        console.log("before navigate");
        navigate(view, {
          replace: true,
        });
      }
    }
  }, [auth]);

  /*--- Handle Click Function ---*/
  const dispatch = useDispatch();
  const [clientSideErrors, setClientSideErrors] = useState({});
  /*allErrors made to be a ref so that we can update it in the root LoginPopup
  component and not have to worry about setState infinite rerender loop*/
  const allErrors = useRef({});
  const handleClick = (e) => {
    //Whenever we click a button, erase all pre-existing errors
    allErrors.current = {};
    //Handle admin 'form' submission
    if (e.target.className.includes("admin-button")) {
      setAdminSubmitted(true);
      setGuestSubmitted(false);

      const errors = validate(pwd);
      setClientSideErrors(errors);
      if (Object.keys(errors).length !== 0) {
        return; //Escape click handler so we don't dispatch to redux
      }
      dispatch(loginAdmin(pwd));
      //Handle guest 'form' submission
    } else if (e.target.className.includes("guest-button")) {
      setAdminSubmitted(false);
      setGuestSubmitted(true);

      dispatch(loginGuest());
    }
  };

  /*--- Set Password Form Field ---*/
  const [pwd, setPwd] = useState("");
  const onChange = (e) => {
    let { value } = e.target;
    setPwd(value);
    //Reset to 'fresh' form if input was changed right after a server response
    if (auth.adminErrorTxt && adminSubmitted) {
      dispatch(removeAdminError());
      setAdminSubmitted(false);
    }
    setClientSideErrors(validate(value));
  };

  /*--- Client Side Password Validation ---*/
  const validate = (pwd) => {
    const errors = {};

    if (pwd == "") {
      errors.pwd = "This field is required for Admin login";
    }
    return errors;
  };

  /*--- Set allErrors State---*/
  //Set based on global auth state and local clientSideErrors state
  allErrors.current = {
    admin:
      adminSubmitted && !auth.adminIsLoading
        ? clientSideErrors.pwd || auth.adminErrorTxt
        : "",
    guest: guestSubmitted && !auth.guestIsLoading ? auth.guestErrorTxt : "",
  };
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
        <form className='login-content' onSubmit={onSubmit}>
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
                placeholder='Admin Password'
                autoComplete='off'
                type='password'
                onChange={onChange}
                disabled={auth.adminIsLoading || auth.guestIsLoading}
              />
            </ThemeProvider>
            <span className='error-txt'>{allErrors.current.admin}</span>
            <button
              className={`login-button admin-button ${
                (auth.adminIsLoading || auth.guestIsLoading) && "disabled"
              }`}
              type='button'
              onClick={(e) => {
                handleClick(e);
              }}
              disabled={auth.adminIsLoading || auth.guestIsLoading}
            >
              Login
            </button>
          </div>
          {showExtra && (
            <div className='guest-section'>
              <div className='login-section-title'>Guest:</div>
              <button
                className={`login-button guest-button ${
                  (auth.adminIsLoading || auth.guestIsLoading) && "disabled"
                }`}
                type='button'
                onClick={(e) => {
                  handleClick(e);
                }}
                disabled={auth.adminIsLoading || auth.guestIsLoading}
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
