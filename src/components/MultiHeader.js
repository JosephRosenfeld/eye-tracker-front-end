import "./MultiHeader.css";
import { useEffect, useState, useRef } from "react";

const MultiHeader = ({ dtArr }) => {
  //calculate the scrollbar width and offset the header by that exact amount
  const [rendered, setRendered] = useState(false);
  const [sbOffset, setSbOffset] = useState("17px");
  const testElRef = useRef(null);

  useEffect(() => {
    /*This code is done within a useEffect because the code references the DOM,
    therefor the element needs to have already mounted in order for us to reference it*/
    /*This code also has no dependency array so that it can be run on both mounting and
    updates*/
    setSbOffset(
      `${testElRef.current.offsetWidth - testElRef.current.clientWidth}px`
      //The scrollbar width on a borderless element is the offsetWidth - clientWidth
    );
    setRendered(true);
  });

  //Create an array of week days
  const weekDayArr = dtArr.map((el) => {
    return new Date(el.year, el.month, el.day).toLocaleDateString("en-us", {
      weekday: "short",
    });
  });

  return (
    <>
      <div ref={testElRef} className='scrollbar-test-el'>
        Testing
        {/*The test el is always rendered in case the user zooms in or out,
        causing the scrollbar to increase in pixel size*/}
      </div>
      {rendered && (
        <div className='multi-header'>
          <div className='time-scale-offset'></div>
          <div className='multi-header-days'>
            {dtArr.map((el, i) => (
              <div
                className='multi-header-day'
                key={el.day + el.month + el.year + ""}
              >
                <div className='multi-header-week-day'>{weekDayArr[i]}</div>
                <div className='multi-header-day-date'>{el.day}</div>
              </div>
            ))}
          </div>
          <div className='scrollbar-offset' style={{ width: sbOffset }}></div>
        </div>
      )}
    </>
  );
};

export default MultiHeader;
