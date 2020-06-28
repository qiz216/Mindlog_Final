import { CREATE_PROMPT } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PROMPT:
      return (state = action.payload);
    default:
      return state;
  }
}
