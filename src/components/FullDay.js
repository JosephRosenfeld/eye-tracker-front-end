import "./FullDay.css";

/*--- Hooks Imports ---*/
import { useSelector } from "react-redux";

/*--- Components Imports ---*/
import Log from "./Log";

const FullDay = ({ year, month, day, first }) => {
  /*Pull our logs for the day*/
  const logs = useSelector((state) =>
    state.logs.logs.filter((log) => {
      let logDt = new Date(log.log_datetime);
      return (
        logDt.getFullYear() == year &&
        logDt.getMonth() == month &&
        logDt.getDate() == day
      );
    })
  );
  //Sort in increasing datetime order
  logs.sort((logA, logB) => {
    let logATime = new Date(logA.log_datetime).getTime();
    let logBTime = new Date(logB.log_datetime).getTime();
    return logATime - logBTime;
  });

  //Create an arr to loop thru and create grid cells
  const timeArr = new Array(26).fill(0).map((el, i) => {
    return i;
  });

  //# per row
  const rowCount = 5;

  return (
    <div
      className='full-day'
      data-date={`${year}-${month >= 10 ? month : "0" + month}-${
        day >= 10 ? day : "0" + day
      }`}
    >
      {/*Below div creates the multi-header vertical divider line*/}
      <div
        className='multi-header-border'
        key='cosmetic-child'
        data-key='cosmetic-child'
      ></div>
      {/*the first full day should have side borders for the times*/}
      {timeArr.map((el, i) => (
        <div
          className={`full-day-hr ${first ? "first-full-day-hr" : ""}`}
          key={i}
          data-key={i}
        ></div>
      ))}
      {logs.map((log, i) => {
        let pos = (i % rowCount) / rowCount;
        return <Log log={log} pos={pos} key={log.log_id} z={i} />;
      })}
    </div>
  );
};

export default FullDay;
