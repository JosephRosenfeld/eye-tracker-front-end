import "./FullDay.css";

const FullDay = ({ year, month, day }) => {
  const tempArr = new Array(26).fill(0);
  const timeArr = tempArr.map((el, i) => {
    return i;
  });

  return (
    <div className='full-day' dt={year}>
      {timeArr.map((el, i) => (
        <div className='full-day-hr' key={i}></div>
      ))}
    </div>
  );
};

export default FullDay;
