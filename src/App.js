import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Actions Imports
import { changePage } from "./redux/actions/pageActions";
import { changeScreenSize } from "./redux/actions/screenSizeActions";

//Component Imports
import MultiDay from "./screens/MultiDay";
import Yearly from "./screens/Yearly";
import Header from "./components/Header";
import MobileHeader from "./components/mobile/MobileHeader";
import SettingsPage from "./components/header_pages/SettingsPage";

function App() {
  //Initialize Dispatch
  const dispatch = useDispatch();

  /*--- Window Width into Global State (Redux) ---*/
  /*We do this so we can conditionally route to pages based on screen sizes in other
  components*/
  const resizeEvListener = () => {
    dispatch(changeScreenSize(window.innerWidth));
  };
  useEffect(() => {
    window.addEventListener("resize", resizeEvListener);
    return () => window.removeEventListener("resize", resizeEvListener);
  }, []);
  const inWidth = useSelector((state) => state.screenSize);

  /*--- Pathname into Global State (Redux) ---*/
  /*The reason we are storing the pathname in state in the first place is because we need
  to trigger a rerender when the path changes. The easiest way to do that is store the path
  in state. State changes and voilà our component rerenders.*/
  /*The reason global state was chosen instead of component state is because we need this
  rerendering to occur in multiple components*/
  /*Additionally, because screen width is stored in state at the App level component,
  the entire App will be rerendered when screen width changes. And because the routing
  is done in the App component, the route can change per rerender, making it possible 
  for redirects to happen whenever the screen size changes*/
  /*For more info read 'locationchange Event Listener Explained in the notes section*/
  const setPageEventListener = () => {
    dispatch(changePage(window.location.pathname));
    console.log("page changed");
  };
  useEffect(() => {
    window.addEventListener("locationchange", setPageEventListener);
    return () =>
      window.removeEventListener("locationchange", setPageEventListener);
  }, []);
  //Set the initial page if a redirect is occurring

  return (
    <Router>
      <div className='App'>
        {inWidth > 800 ? <Header /> : <MobileHeader />}
        <Routes>
          <Route path='/' element={<Navigate to='/year' replace />} />
          <Route
            path='/3day'
            element={
              inWidth > 800 ? <Navigate to='/week' replace /> : <MultiDay />
            }
          >
            <Route path='settings' element={<SettingsPage />} />
          </Route>
          <Route
            path='/week'
            element={
              inWidth <= 800 ? <Navigate to='/3day' replace /> : <MultiDay />
            }
          >
            <Route path='settings' element={<SettingsPage />} />
          </Route>
          <Route path='/year' element={<Yearly />}>
            <Route path='settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
