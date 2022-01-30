/*--- Utilities Imports ---*/
import Cookies from "js-cookie";

/*--- Hooks Imports ---*/
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/*--- Actions Imports ---*/
import { changeScreenSize } from "./redux/actions/screenSizeActions";
import { loginCheck } from "./redux/actions/authActions";
import { getLogs } from "./redux/actions/logsActions";
import { getSettings } from "./redux/actions/settingsActions";

/*--- Component Imports ---*/
import MultiDay from "./screens/MultiDay";
import Yearly from "./screens/Yearly";
import Header from "./components/Header";
import MobileHeader from "./components/mobile/MobileHeader";
import PopupPage from "./components/popup_pages/PopupPage";
import PopupOverlay from "./components/popup_pages/PopupOverlay";
import LoginPopup from "./components/popup_pages/LoginPopup";
import TestingComp from "./components/TestingComp";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  console.log("app rerender");

  /*--- Check Cookie Status ---*/
  /*We have a cookie, but does that cookie belong to an admin or a guest? We call
  the login check action creator in order to find out*/
  useEffect(() => {
    if (auth.guestLoggedIn) {
      dispatch(loginCheck());
    }
  }, []);

  /*--- Pull in Data ---*/
  //(if logged in)
  useEffect(() => {
    if (auth.guestLoggedIn || auth.adminLoggedIn) {
      dispatch(getSettings());
      dispatch(getLogs());
    }
  }, []);

  /*--- Redirect if unauthorized or wrong screen size ---*/
  const navigate = useNavigate();
  const loc = useLocation();
  const auth = useSelector((state) => state.auth);
  const inWidth = useSelector((state) => state.screenSize);
  useEffect(() => {
    //If we're unauthorized and not at login page, then redirect there
    if (
      !auth.guestLoggedIn &&
      !auth.adminLoggedIn &&
      loc.pathname != "/year/login"
    ) {
      console.log("before app navigate");
      navigate("/year/login", { replace: true });
      //If we're on too big a screen go to a smaller one
    } else if (inWidth > 800 && loc.pathname.match(/^\/[^\/]*/)[0] == "/3day") {
      navigate("/week", { replace: true });
      //If we're on too big a screen go to a bigger one
    } else if (
      inWidth <= 800 &&
      loc.pathname.match(/^\/[^\/]*/)[0] == "/week"
    ) {
      navigate("/3day", { replace: true });
    }
  });

  /*--- Window Width into Global State (Redux) ---*/
  /*We do this so we can conditionally route to different pages based on screen 
  sizes in other components*/
  const resizeEvListener = () => {
    dispatch(changeScreenSize(window.innerWidth));
  };
  useEffect(() => {
    window.addEventListener("resize", resizeEvListener);
    return () => window.removeEventListener("resize", resizeEvListener);
  }, []);
  /*Additionally, because screen width is pulled in with useSelector at the App level 
  component, the entire App will be rerendered when screen width changes. And 
  because the routing is done in the App component, the route can change per 
  rerender, making it possible for redirects to happen whenever the screen size changes*/

  return (
    <div className='App'>
      {inWidth > 800 ? <Header /> : <MobileHeader />}
      <AnimatePresence exitBeforeEnter>
        <Routes location={loc} key={loc.key}>
          <Route path='testing' element={<TestingComp />} />
          <Route path='/' element={<Navigate to='/year' replace />} />
          <Route path='/3day' element={<MultiDay />}>
            <Route path='add' element={<PopupPage title='Add Item' />} />
            {/* <Route path='reminders' element={<PopupPage title='Reminders' />} /> */}
            <Route path='info' element={<PopupPage title='Information' />} />
            <Route path='settings' element={<PopupPage title='Settings' />} />
            <Route
              path='login'
              element={
                <>
                  {<PopupOverlay />}
                  <LoginPopup
                    showExtraProp={!auth.guestLoggedIn && !auth.adminLoggedIn}
                  />
                </>
              }
            />
          </Route>
          <Route path='/week' element={<MultiDay />}>
            <Route
              path='add'
              element={
                <>
                  <PopupOverlay />
                  <PopupPage title='Add Item' />
                </>
              }
            />
            {/* <Route
              path='reminders'
              element={
                <>
                  <PopupOverlay />
                  <PopupPage title='Reminders' />
                </>
              }
            /> */}
            <Route
              path='info'
              element={
                <>
                  <PopupOverlay />
                  <PopupPage title='Information' />
                </>
              }
            />
            <Route
              path='settings'
              element={
                <>
                  <PopupOverlay />
                  <PopupPage title='Settings' />
                </>
              }
            />
            <Route
              path='login'
              element={
                <>
                  {<PopupOverlay />}
                  <LoginPopup
                    showExtraProp={!auth.guestLoggedIn && !auth.adminLoggedIn}
                  />
                </>
              }
            />
          </Route>
          <Route path='/year' element={<Yearly />}>
            <Route
              path='add'
              element={
                <>
                  {inWidth > 800 && <PopupOverlay />}
                  <PopupPage title='Add Item' />
                </>
              }
            />
            {/* <Route
              path='Reminders'
              element={
                <>
                  {inWidth > 800 && <PopupOverlay />}
                  <PopupPage title='Reminders' />
                </>
              }
            /> */}
            <Route
              path='info'
              element={
                <>
                  {inWidth > 800 && <PopupOverlay />}
                  <PopupPage title='Information' />
                </>
              }
            />
            <Route
              path='settings'
              element={
                <>
                  {inWidth > 800 && <PopupOverlay />}
                  <PopupPage title='Settings' />
                </>
              }
            />
            <Route
              path='login'
              element={
                <>
                  {<PopupOverlay />}
                  <LoginPopup
                    showExtraProp={!auth.guestLoggedIn && !auth.adminLoggedIn}
                  />
                </>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
