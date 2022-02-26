import axios from "axios"

export const postImage = x => {
    const { mediaEncode, mediaType, usageType, createdBy } = x
    let promise = axios.post(`/api/medias/post_image`, {
        mediaEncode,
        mediaType,
        usageType,
        createdBy
    })
    let response = promise.then(() => { return true })
        .catch(err => err.json("Error: " + err))
    return response
}

export const getMedia = x => {
    const { usageType, createdBy } = x
    let promise = axios.get(`/api/medias/get_media/${createdBy}/${usageType}`, {})
    let dataPromise =
        promise.then(res => {
            return res.data.medias[0]
        })
            .catch(err => err.json("Error: " + err))

    return dataPromise
}

export const removeMedia = x => dispatch => {
    const {id, setIsLoaded} = x
    setIsLoaded(false)
    axios
      .post(`/api/medias/remove/${id}`)
      .then(() => setIsLoaded(true))
      .catch(err => err.json("Error: " + err))
  };