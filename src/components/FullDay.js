import "./FullDay.css";

const FullDay = ({ year, month, day, first }) => {
  const tempArr = new Array(26).fill(0);
  const timeArr = tempArr.map((el, i) => {
    return i;
  });

  return (
    <>
      {" "}
      <div
        className='full-day'
        date={`${year}-${month >= 10 ? month : "0" + month}-${
          day >= 10 ? day : "0" + day
        }`}
      >
        {/*the first full day shouldn't have that upper border in the header*/}
        <div
          className={
            !first
              ? "multi-header-border"
              : "multi-header-border first-day-border"
          }
          key='cosmetic-child'
          data-key='cosmetic-child'
        ></div>
        {/*the first full day should also have side borders for the times*/}
        {timeArr.map((el, i) => (
          <div
            className={`full-day-hr ${first ? "first-full-day-hr" : ""}`}
            key={i}
            data-key={i}
          ></div>
        ))}
      </div>
    </>
  );
};

export default FullDay;
