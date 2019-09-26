import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAIL} from "./types";
import {setAlert} from "./alert";

//Registrar usuario
export const register = (data) => {
  return async (dispatch) => {
    try {
      const {name, email, password, passwordConfirm} = data;
      const res = await axios({
        method: "POST",
        url: "/api/users",
        data: {
          name,
          email,
          password,
          passwordConfirm
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

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