import axios from "axios";
import {setAlert} from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";


//Tomar el perfil del usuario actual
export const getCurrentProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "/api/profile/me"
      });

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })

    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      })
    }
  }
}

//Crear/actualizar el perfil del usuario
export const createProfile = (formData, history, edit = false) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/api/profile",
        data: {
          ...formData
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch(setAlert(edit ? "Profile updated!" : "Profile created!", "success"));

      if(!edit) {
        history.push("/dashboard");
      }

    } catch (error) {
      console.log(error.response)
      const errors = error.response.data.errors;
      if(errors) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, "danger"))
        })
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      })
    }
  }
}