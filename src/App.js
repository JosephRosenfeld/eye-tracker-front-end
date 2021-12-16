import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//component imports
import ThreeDay from "./screens/ThreeDay";
import Weekly from "./screens/Weekly";
import Yearly from "./screens/Yearly";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/3day' element={<ThreeDay />} />
          <Route path='/week' element={<Weekly />} />
          <Route path='/year' element={<Yearly />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
