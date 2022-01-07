import "./Yearly.css";

/*--- Utilities Imports ---*/
import { AnimatePresence } from "framer-motion";

/*--- Hook Imports ---*/

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
