import "./TimeScale.css";

const TimeScale = () => {
  const tempArr = new Array(24).fill(0);
  const timeArr = tempArr.map((el, i) => {
    return i;
  });

  return (
    <div className='time-scale'>
      {timeArr.map((el) => (
        <div className='time-scale-hr' time={el}>
          {el}
        </div>
      ))}
    </div>
  );
};
export default TimeScale;
