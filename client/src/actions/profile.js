import axios from "axios";
import {setAlert} from "./alert";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILES, GET_GITHUB_REPOS } from "./types";


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
      if(error.response) {
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
}

//Tomar todos los perfiles de usuario
export const getProfiles = () => {
  return async (dispatch) => {
    dispatch({type: CLEAR_PROFILE});

    try {
      const res = await axios({
        method: "GET",
        url: "/api/profile"
      });

      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })

    } catch (error) {
      if(error.response) {
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
}

//Tomar el perfil de un usuario mediante su ID
export const getProfile = (userId) => {
  return async (dispatch) => {
    dispatch({type: CLEAR_PROFILE});

    try {
      const res = await axios({
        method: "GET",
        url: `/api/profile/user/${userId}`
      });

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })

    } catch (error) {
      if(error.response) {
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
}

//Tomar los repositorios de github del usuario
export const getGithubRepos = (username) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: `/api/profile/github/${username}`
      });

      dispatch({
        type: GET_GITHUB_REPOS,
        payload: res.data
      })

    } catch (error) {
      if(error.response) {
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
      
      history.push("/dashboard");

    } catch (error) {
      let errors = null;
      if (error.response) {
        errors = error.response.data.errors;
        errors.forEach(err => {
          dispatch(setAlert(err.msg, "danger"))
        });

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
}

//Agregar experience al perfil del usuario
export const addExperience = (formData, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: "/api/profile/experience",
        data: {
          ...formData
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Experience added!", "success"));
      
      history.push("/dashboard");

    } catch (error) {
      let errors = null;
      if (error.response) {
        errors = error.response.data.errors;
        errors.forEach(err => {
          dispatch(setAlert(err.msg, "danger"))
        });

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
}

//Agregar education al perfil del usuario
export const addEducation = (formData, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: "/api/profile/education",
        data: {
          ...formData
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Education added!", "success"));
      
      history.push("/dashboard");

    } catch (error) {
      let errors = null;
      if (error.response) {
        errors = error.response.data.errors;
        errors.forEach(err => {
          dispatch(setAlert(err.msg, "danger"))
        });

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
}

//Borrar experience del perfil del usuario
export const deleteExperience = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `/api/profile/experience/${id}`
      });

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("Experience removed!", "success"));

    } catch (error) {
      if(error.response) {
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
}

//Borrar education del perfil del usuario
export const deleteEducation = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `/api/profile/education/${id}`
      });

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("Education removed!", "success"));

    } catch (error) {
      if(error.response) {
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
}

//Borrar perfil y cuenta del usuario
export const deleteUserAccount = () => {
  return async (dispatch) => {
    if (window.confirm("Are you sure? This action can not be undone")) {
      try {
        await axios({
          method: "DELETE",
          url: "/api/profile"
        });

        dispatch({
          type: CLEAR_PROFILE
        });

        dispatch({
          type: DELETE_ACCOUNT
        });

        dispatch(setAlert("Your account has been permanently deleted", "success"))

      } catch (error) {
        if(error.response) {
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
  }
}