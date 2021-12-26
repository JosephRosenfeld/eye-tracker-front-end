import "./MultiDay.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import FullDay from "../components/FullDay";

const MultiDay = () => {
  //if state doesn't exist (didn't navigate her by clicking a yearly link)

  return (
    <main className='mutli-day-container'>
      {/*Some thing for the timeline on the left side*/}
      <div>Header</div>
      <div>Times</div>
      <div className='page'>
        <FullDay day='sunday' />
        <FullDay day='monday' />
        <FullDay day='tuesday' />
        <FullDay day='wednesday' />
        <FullDay day='thursday' />
        <FullDay day='friday' />
        <FullDay day='saturday' />
      </div>
    </main>
  );
};

export default MultiDay;
