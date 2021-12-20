import "./Yearly.css";

import { useEffect } from "react";

import Month from "../components/Month";

const Yearly = () => {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  useEffect(() => {});

  return (
    <div className='year-container'>
      {months.map((m) => (
        <Month m={m} />
      ))}
    </div>
  );
};

export default Yearly;
