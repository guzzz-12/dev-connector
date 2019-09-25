import {SET_ALERT, REMOVE_ALERT} from "./types";
import uuid from "uuid";

export const setAlert = (msg, alertType) => {
  return (dispatch) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: {msg, alertType, id}
    });

    setTimeout(() => {
      return dispatch({
        type: REMOVE_ALERT,
        payload: id
      })
    }, 4500)
  }
}