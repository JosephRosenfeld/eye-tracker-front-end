import AnimateHeight from "react-animate-height";
import { useState } from "react";
//import "./TestingComp.css";

const TestingComp = () => {
  const [show, setShow] = useState(true);
  const [height, setHeight] = useState("100%");

  const onClick = () => {
    setShow(!show);
    setHeight(height == "100%" ? "auto" : "100%");
  };

  return (
    <AnimateHeight duration={500} height={height}>
      <div className='container'>
        <div className='child1'>Jimmy</div>
        {show && <div className='child2'>SHow and hide</div>}
        <button onClick={onClick}>Show and Hide</button>
      </div>
    </AnimateHeight>
  );
};

export default TestingComp;
