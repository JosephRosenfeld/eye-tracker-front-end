import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { useState } from "react";
const Test = () => {
  const [dtTime, setDtTime] = useState(new Date());
  console.log(dtTime);

  return (
    <div>
      <Flatpickr
        value={dtTime}
        options={{
          noCalendar: true,
          enableTime: true,
          minuteIncrement: 1,
          dateFormat: "h:i K",
        }}
        onChange={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
};

export default Test;
