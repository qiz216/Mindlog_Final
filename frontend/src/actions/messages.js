import axios from "axios";
import { createPrompt, returnErrors } from "./prompts";
import { GET_MESSAGES, DELETE_MESSAGE, ADD_MESSAGE } from "./types.js";
import { tokenConfig } from "./auth";

//GET MESSAGES
export const getMessages = (moment) => (dispatch, getState) => {
  axios
    .get(
      `/api/messages?month=${moment.month() + 1}&day=${moment.date()}`,
      tokenConfig(getState)
    )
    //.get("/api/messages/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//DELETE MESSAGES
export const deleteMessage = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/messages/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createPrompt({ deleteReflection: "Reflection Deleted" }));
      dispatch({
        type: DELETE_MESSAGE,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

//ADD MESSAGES
export const addMessage = (message) => (dispatch, getState) => {
  //console.log(message);
  axios
    .post("/api/messages/", message, tokenConfig(getState))
    .then((res) => {
      dispatch(createPrompt({ addReflection: "Reflection Added" }));
      dispatch({
        type: ADD_MESSAGE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/*
 
*/
