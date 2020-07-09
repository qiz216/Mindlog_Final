import { GET_TIMES, DELETE_TIME } from "../actions/types";

const initialState = {
  times: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TIMES:
      return {
        ...state,
        times: action.payload,
      };
    case DELETE_TIME:
      return {
        ...state,
        times: state.times.filter((time) => time.id !== action.payload),
      };
    default:
      return state;
  }
}
