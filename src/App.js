import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//component imports
import MultiDay from "./screens/MultiDay";
import Yearly from "./screens/Yearly";
import Header from "./components/Header";

function App() {
  //Functionality for storing the window's width as a state variable
  const [inWidth, setInWidth] = useState(window.innerWidth);
  useEffect(() => {
    const shiftWidth = () => {
      setInWidth(window.innerWidth);
    };
    window.addEventListener("resize", shiftWidth);
    return () => window.removeEventListener("resize", shiftWidth);
  });

  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route
            path='/3day'
            element={
              inWidth > 700 ? <Navigate to='/week' replace /> : <MultiDay />
            }
          />
          <Route
            path='/week'
            element={
              inWidth <= 700 ? <Navigate to='/3day' replace /> : <MultiDay />
            }
          />
          <Route path='/year' element={<Yearly />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
