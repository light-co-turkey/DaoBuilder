import axios from "axios"
import { setAllUsers } from "./paramActions"

export const postImage = async x => {
    const { mediaEncode, mediaType, usageType, createdBy } = x
    let promise = axios.post(`/api/medias/post_image`, {
        mediaEncode,
        mediaType,
        usageType,
        createdBy
    })
    let response = promise.then(() => { return true })
        .catch(err => console.log(err))
    return response
}

export const getMedia = x => dispatch => {
    const { usageType, createdBy, usersList } = x
    let promise = axios.get(`/api/medias/get_media/${createdBy}/${usageType}`, {})
    let dataPromise =
        promise.then(res => {
            let medias = res.data.medias[0]
            if (usageType === "userPI") {
                dispatch(setAllUsers(usersList.map(x => (x._id === createdBy ?
                    { ...x, mediaBuffer: medias.mediaBuffer, mediaType: medias.mediaType } : x))))
            }
            return res.data.medias[0]
        })
            .catch(err => console.log(err))

    return dataPromise
}