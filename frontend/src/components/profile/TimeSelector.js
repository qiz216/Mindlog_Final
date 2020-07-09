import React, { useState } from "react";
import "antd/dist/antd.css";
import { TimePicker } from "antd";

export function TimeSelector() {
  const [count, setCount] = useState(0);

  // we will need to do use effect here to check if the
  // user already has some times scheduled.
  //also we will want a times list to add some CRUD
  //functionality for the scheduler.

  function onChange(time, timeString) {
    console.log(time, timeString);
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <div>
      <TimePicker
        use12Hours
        minuteStep={15}
        disabled={count > 2 ? true : false}
        format="h:mm a"
        onChange={onChange}
      />
    </div>
  );
}

export default TimeSelector;
