import "./TimeScale.css";

const TimeScale = () => {
  const tempArr = new Array(24).fill(0);
  const timeArr = tempArr.map((el, i) => {
    return i;
  });
  //add buffers to arr
  timeArr.unshift(-1);
  timeArr.push(0);

  return (
    <div className='time-scale'>
      {timeArr.map((el, i) => (
        <div
          className='time-scale-hr'
          time={
            el >= 12
              ? el == 12
                ? `12 p.m.`
                : `${el % 12} p.m.`
              : el == 0
              ? `12 a.m.`
              : `${el % 12} a.m.`
          }
          key={i}
        >
          {el >= 12
            ? el == 12
              ? `12 p.m.`
              : `${el % 12} p.m.`
            : el == 0
            ? `12 a.m.`
            : `${el % 12} a.m.`}
        </div>
      ))}
    </div>
  );
};
export default TimeScale;
