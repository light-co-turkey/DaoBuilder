import axios from "axios";
import { getMedia } from "./mediaActions";

import { SET_PARAM_IS_LOADED, SET_USERS_LIST } from "./types";

export const getAllUsers = () => dispatch => {
    dispatch(setParamIsLoaded(false))
    axios
        .get("/api/users/get_all_users")
        .then(res => {
            localStorage.setItem("usersList", JSON.stringify(res.data))
            dispatch(setAllUsers(res.data))
            dispatch(setParamIsLoaded(true))
        })
}

export const nestUserPI = x => dispatch => {
    const { usersList, createdBy, usageType, handleSets, setIsLoaded } = x
    let filter = async () => {
        let result = usersList.filter(x => x._id === createdBy)[0]
        return result
    }
    filter().then((x) => {
        if (x.mediaBuffer) {
            handleSets(x)
                .then(setIsLoaded(true))
        } else {
            console.log("getting media")
            dispatch(getMedia({ createdBy, usageType, usersList }))
                .then(x => {
                    if (x !== undefined) {
                        handleSets(x)
                    }
                    setIsLoaded(true)
                })
                .catch(err => console.log(err))
        }
    })
}

export const setParamIsLoaded = x => {
    return {
        type: SET_PARAM_IS_LOADED,
        payload: x
    }
}

//Set All User
export const setAllUsers = x => {
    return {
        type: SET_USERS_LIST,
        payload: x
    }
}