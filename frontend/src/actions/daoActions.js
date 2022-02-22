import axios from "axios";

import { GET_ERRORS } from "./types";

// Create Dao 
export const createDao = (daoData) => dispatch => {
    axios
        .post("/api/daos/create", daoData)
        .then(res => {return res})
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};