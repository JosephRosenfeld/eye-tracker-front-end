import "./FullDay.css";

const FullDay = ({ year, month, day }) => {
  const tempArr = new Array(24).fill(0);
  const timeArr = tempArr.map((el, i) => {
    return i;
  });

  return (
    <div className='full-day' dt={year}>
      {timeArr.map((el) => (
        <div className='full-day-hr'>Test</div>
      ))}
    </div>
  );
};

export default FullDay;
