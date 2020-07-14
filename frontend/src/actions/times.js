import axios from "axios";
import { ADD_TIME } from "./types.js";
import { tokenConfig } from "./auth";

//ADD TIME
export const addTime = (time) => (dispatch, getState) => {
  console.log(time);
  const new_time = { schedule_time: time };
  axios
    .post("/api/scheduler/", new_time, tokenConfig(getState))
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
};

export default addTime;
