import axios from "axios";
import store from "../store";
import {logoutUser} from "./authActions"

import {
  SET_USER, SET_USER_IS_LOADED, SET_USER_PROPS
} from "./types";

//Get User
export const getUser = e => dispatch => {
  dispatch(setUserIsLoaded(false))
  const userId = e
  axios
    .get(`/api/users/get_user/${userId}`)
    .then(res => {
      if (!res.data) { store.dispatch(logoutUser()); } else { }
      if (!res.data) { } else {
        dispatch(setUser(res.data))
        dispatch(setUserIsLoaded(true))
      }
    });
}

//Get User Fields
export const getUserFields = async e => {
  const userId = e.id
  let fields = e.fields
  axios
    .get(`/api/users/get_user_fields/${userId}`, fields)
    .then(res => {
      console.log(res.data)
      return res.data
    });
}

// Edit User
export const editUser = userData => {
  axios
    .post("/api/users/edit", userData)
};

//Set Is Loaded
export const setUserIsLoaded = e => {
  return {
    type: SET_USER_IS_LOADED,
    payload: e
  }
}
//Set User
const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  }
}

//Set User
const setUserProps = user => {
  return {
    type: SET_USER_PROPS,
    payload: user
  }
}