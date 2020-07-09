import axios from "axios";
import {
  GET_MESSAGES,
  DELETE_MESSAGE,
  ADD_MESSAGE,
  GET_DATES,
  DELETE_DATE,
} from "./types.js";
import { tokenConfig } from "./auth";

//GET DATES
export const getDates = () => (dispatch, getState) => {
  axios
    .get("/api/dates/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_DATES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//DELETE DATE
export const deleteDate = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/dats/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_DATE,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};
