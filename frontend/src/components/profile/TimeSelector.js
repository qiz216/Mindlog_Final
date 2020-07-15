import React, { useState, Fragment } from "react";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
//import { addTime } from "../../actions/times";
import { connect } from "react-redux";
import axios from "axios";
import { tokenConfig } from "../../actions/auth";
import store from "../../store";

export function TimeSelector() {
  const [times, setTimes] = useState([]);

  // we will need to do use effect here to check if the
  // user already has some times scheduled.
  //also we will want a times list to add some CRUD
  //functionality for the scheduler.

  function onChange(time, timeString) {
    console.log(time.format("H:mm"));
    const new_time = { schedule_time: time.format("H:mm") };
    axios
      .post("/api/scheduler/", new_time, tokenConfig(store.getState))
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ADD_TIME,
          payload: res.data,
        });
      })
      .catch(
        (err) => console.log(err)
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
    //console.log(timeString);
    setTimes([...times, timeString]);
  }

  function handleDelete(idx) {
    const new_times = times.filter((time, id) => id !== idx);
    console.log(`ID to delete is ${idx}`);
    console.log(`Times:: ${new_times}`);
    setTimes(new_times);
  }
  return (
    <Fragment>
      <div>
        <div className="card card-body mt-4 mb-4">
          <h2>Schedule Your Journaling Reminders</h2>
          <TimePicker
            use12Hours
            minuteStep={15}
            disabled={times.length > 2 ? true : false}
            format="h:mm a"
            onChange={onChange}
          />
        </div>
        {times.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Your Schedule</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {times.map((time, idx) => (
                <tr key={idx}>
                  <td>{time}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(TimeSelector);
