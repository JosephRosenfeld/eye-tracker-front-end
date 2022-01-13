/*--- Hooks Imports ---*/
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/*--- Actions Imports ---*/
import { changeScreenSize } from "./redux/actions/screenSizeActions";

/*--- Component Imports ---*/
import Test from "./screens/Test";
import MultiDay from "./screens/MultiDay";
import Yearly from "./screens/Yearly";
import Header from "./components/Header";
import MobileHeader from "./components/mobile/MobileHeader";
import PopupPage from "./components/header_pages/PopupPage";
import PopupOverlay from "./components/header_pages/PopupOverlay";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  /*--- Add to the history stack in case we routed to a popup page on mobile ---*/

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
  const inWidth = useSelector((state) => state.screenSize);
  /*Additionally, because screen width is pulled in with useSelector at the App level 
  component, the entire App will be rerendered when screen width changes. And 
  because the routing is done in the App component, the route can change per 
  rerender, making it possible for redirects to happen whenever the screen size changes*/

  return (
    <div className='App'>
      {<Header />}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path='/' element={<Navigate to='/year' replace />} />
          <Route path='/test' element={<Test />} />

          <Route
            path='/3day'
            element={
              inWidth > 800 ? <Navigate to='/week' replace /> : <MultiDay />
            }
          >
            <Route path='add' element={<PopupPage title='Add Item' />} />
            <Route path='reminders' element={<PopupPage title='Reminders' />} />
            <Route path='info' element={<PopupPage title='Information' />} />
            <Route path='settings' element={<PopupPage title='Settings' />} />
          </Route>
          <Route
            path='/week'
            element={
              inWidth <= 800 ? <Navigate to='/3day' replace /> : <MultiDay />
            }
          >
            <Route
              path='add'
              element={
                <>
                  <PopupOverlay />
                  <PopupPage title='Add Item' />
                </>
              }
            />
            <Route
              path='reminders'
              element={
                <>
                  <PopupOverlay />
                  <PopupPage title='Reminders' />
                </>
              }
            />
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
            <Route
              path='Reminders'
              element={
                <>
                  {inWidth > 800 && <PopupOverlay />}
                  <PopupPage title='Reminders' />
                </>
              }
            />
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
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
