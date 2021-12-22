import "./Yearly.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import Month from "../components/Month";
//import { Transition } from "react-transition-group";

const Yearly = () => {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const increased = useSelector((state) => state.viewDt);
  useEffect(() => {
    console.log("we ran use Effect");
  }, [increased]);

  return (
    <main className='year-container'>
      {months.map((m, idx) => (
        <Month m={m} key={idx} />
      ))}
    </main>
  );
};

export default Yearly;
