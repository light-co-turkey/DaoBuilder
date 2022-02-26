import axios from "axios";
import { filterSingleItem } from "../utils/basicUtils";
import { getMedia } from "./mediaActions";

import { SET_PARAM_IS_LOADED, SET_USERS_LIST, SET_DAOS_LIST } from "./types";
import { getUserFields } from "./userActions";

export let handleMediaMap = (f, g, z) => {
    let result = f.map(x => (x._id === z ?
        { ...x, mediaBuffer: g.mediaBuffer, mediaType: g.mediaType } : x))
    return result
}

export const getAllUsers = props => dispatch => {
    const { actionType } = props
    dispatch(setParamIsLoaded(false))
    axios
        .get("/api/users/get_all_users")
        .then(res => {
            if (actionType === "semi") {
                return res.data
            } else {
                localStorage.setItem("usersList", JSON.stringify(res.data))
                dispatch(setAllUsers(res.data))
                dispatch(setParamIsLoaded(true))
            }
        })
}

export const getAllDaos = props => dispatch => {
    const { actionType } = props
    dispatch(setParamIsLoaded(false))
    axios
        .get("/api/daos/get_all_daos")
        .then(res => {
            if (actionType === "semi") {
                return res.data
            } else {
                localStorage.setItem("daosList", JSON.stringify(res.data))
                dispatch(setAllDaos(res.data))
                dispatch(setParamIsLoaded(true))
            }
        })
}

export const extendLocalList = async props => {
    const { createdBy, list } = props
    console.log("no-data")
    getUserFields({
        id: createdBy,
        fields: {
            name: 1,
            surname: 1,
            username: 1,
            _id: 1
        }
    })
        .then(async (x) => {
            /* await list.push(x) */
            console.log(x)
            /* localStorage.setItem("usersList", JSON.stringify(list)) */
            return list
        });
}

export const nestParamsPI = a => dispatch => {
    const { usersList, daosList, createdBy, usageType, handleSets, setIsLoaded } = a

    let upi = usageType === "userPI"
    let dpi = usageType === "daoPI"
    let list = upi ? usersList : dpi ? daosList : []
    let setAll = upi ? setAllUsers : dpi ? setAllDaos : null
    let singleItem = filterSingleItem(list, createdBy).then((res) => { return res })

    let handleNestChain = (z) => {
        if (singleItem.mediaBuffer) {
            handleSets(singleItem).then(() => setIsLoaded(true))
        } else {
            singleItem.then(async (x) => {
                if (x.mediaBuffer) {
                    handleSets(x)
                        .then(setIsLoaded(true))
                } else {
                    console.log("getting media")
                    getMedia({ createdBy, usageType })
                        .then(x => {
                            if (x !== undefined) {
                                let newMap = handleMediaMap(list, x, createdBy)
                                handleSets(x)
                                dispatch(setAll(newMap))
                                setIsLoaded(true)
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
        }
    }

    handleNestChain();
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

//Set All Daos
export const setAllDaos = x => {
    return {
        type: SET_DAOS_LIST,
        payload: x
    }
}