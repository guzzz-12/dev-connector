import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAIL} from "./types";
import {setAlert} from "./alert";

//Registrar usuario
export const register = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const body = JSON.stringify(data);

    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert("Successfully registered", "success"))

    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, "danger"))
        })
      }
      dispatch({
        type: REGISTER_FAIL
      })
    }
  }
}