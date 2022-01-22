import "./Yearly.css";

/*--- Utilities Imports ---*/

/*--- Hook Imports ---*/
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/*--- Component Imports ---*/
import Month from "../components/Month";
import { Outlet } from "react-router-dom";

/*--- Actions Import ---*/

const Yearly = () => {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <main className='year-container'>
      {months.map((m, idx) => (
        <Month m={m} key={idx} />
      ))}
      <Outlet />
    </main>
  );
};

export default Yearly;
