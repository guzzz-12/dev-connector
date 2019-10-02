import axios from "axios";
import {setAlert} from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST } from "./types";

//Tomar los posts
export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios("/api/posts");

      dispatch({
        type: GET_POSTS,
        payload: res.data
      });

    } catch (error) {
      if(error.response) {
        dispatch({
          type: POST_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status
          }
        })
      }
    }
  }
}

//Agregar likes a los posts
export const addLikes = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `/api/posts/like/${postId}`
      });

      dispatch({
        type: UPDATE_LIKES,
        payload: {id: postId, likes: res.data}
      });

    } catch (error) {
      if(error.response) {
        dispatch({
          type: POST_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status
          }
        })
      }
    }
  }
}

//Remover likes a los posts
export const removeLikes = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `/api/posts/unlike/${postId}`
      });

      dispatch({
        type: UPDATE_LIKES,
        payload: {id: postId, likes: res.data }
      });

    } catch (error) {
      if(error.response) {
        dispatch({
          type: POST_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status
          }
        });
        if(error.response.data.msg) {
          dispatch(setAlert(error.response.data.msg, "danger"))
        }
      }
    }
  }
}

//Borrar post
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `/api/posts/${postId}`
      });

      dispatch({
        type: DELETE_POST,
        payload: res.data
      });

    } catch (error) {
      if(error.response) {
        dispatch({
          type: POST_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status
          }
        })
      }
    }
  }
}

//Crear post
export const createPosts = (postContent) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: `/api/posts`,
        data:{
          text: postContent
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: ADD_POST,
        payload: res.data
      });

      dispatch(setAlert("Post created successfully", "success"))

    } catch (error) {
      if(error.response) {
        dispatch({
          type: POST_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status
          }
        })
        dispatch(setAlert(error.response.data.errors[0].msg, "danger"))
      }
    }
  }
}