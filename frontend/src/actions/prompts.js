import { CREATE_PROMPT, GET_ERRORS } from "./types";

export const createPrompt = (prompt) => {
  return {
    type: CREATE_PROMPT,
    payload: prompt,
  };
};

//RETURN ERRORS

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};
