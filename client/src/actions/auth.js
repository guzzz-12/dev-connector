import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE} from "./types";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";


//Chequear si hay usuario logueado
export const loadUser = () => {
  return async (dispatch) => {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  }
}

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
      dispatch(loadUser());

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

//Loguear usuario
export const login = (data) => {
  return async (dispatch) => {
    try {
      const {email, password} = data;
      const res = await axios({
        method: "POST",
        url: "/api/auth",
        data: {
          email,
          password
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());

    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, "danger"))
        })
      }
      dispatch({
        type: LOGIN_FAIL
      })
    }
  }
}

//Cerrar sesión (Logout)
export const logout = () => {
  return (dispatch) => {
    dispatch({type: LOGOUT});
    dispatch({type: CLEAR_PROFILE})
  }
}