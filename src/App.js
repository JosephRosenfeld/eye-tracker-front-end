import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { changePage } from "./redux/actions/pageActions";

//component imports
import MultiDay from "./screens/MultiDay";
import Yearly from "./screens/Yearly";
import Header from "./components/Header";

function App() {
  /*--- Window Width into State ---*/
  const [inWidth, setInWidth] = useState(window.innerWidth);
  useEffect(() => {
    const shiftWidth = () => {
      setInWidth(window.innerWidth);
    };
    window.addEventListener("resize", shiftWidth);
    return () => window.removeEventListener("resize", shiftWidth);
  }, []);
  /*Might put the above state into the redux store later if I need it elsewhere in the app*/

  /*--- Pathname into Global State (Redux) ---*/
  /*The reason we are storing the pathname in state in the first place is because we need
  to trigger a rerender when the path changes. The easiest way to do that is store the path
  in state. State changes and voilà our component rerenders.
  The reason global state was chosen instead of component state is because we need this
  rerendering to occur in multiple components*/
  const dispatch = useDispatch();
  const setPageEventListener = () => {
    dispatch(changePage(window.location.pathname));
  };
  useEffect(() => {
    window.addEventListener("locationchange", setPageEventListener);
    return () =>
      window.removeEventListener("locationchange", setPageEventListener);
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route
            path='/3day'
            element={
              inWidth > 800 ? <Navigate to='/week' replace /> : <MultiDay />
            }
          />
          <Route
            path='/week'
            element={
              inWidth <= 800 ? <Navigate to='/3day' replace /> : <MultiDay />
            }
          />
          <Route path='/year' element={<Yearly />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
