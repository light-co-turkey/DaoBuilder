import {
  SET_PARAM_IS_LOADED, SET_USERS_LIST, SET_DAOS_LIST, SET_PARAM_PROPS
} from "../actions/types";

let usersList = localStorage.usersList == null ? [] : JSON.parse(localStorage.usersList)
let daosList = localStorage.daosList == null ? [] : JSON.parse(localStorage.daosList)
let props = {
  postSelect: [],
  daoSelect: []
}

const initialState = {
  isLoaded: false,
  usersList: usersList,
  daosList: daosList,
  props: props
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PARAM_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload
      };
    case SET_USERS_LIST:
      return {
        ...state,
        usersList: action.payload
      };
    case SET_DAOS_LIST:
      return {
        ...state,
        daosList: action.payload
      };
    case SET_PARAM_PROPS:
      return {
        ...state,
        props: {
          ...state.props,
          [action.payload.field]: action.payload.prop
        }
      };
    default:
      return state;
  }
}
