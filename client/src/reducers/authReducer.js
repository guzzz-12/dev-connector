import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_LOADED:
      return {
        ...initialState,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user
      }
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthtenticated: false,
        loading: false
      }
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthtenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthtenticated: false,
        loading: false
      }
    default:
      return state;
  }
}