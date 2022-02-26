import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { TextBtn } from './ui/Buttons';
import { postImage } from '../actions/mediaActions';
import { arrayBuffertoBase64 } from '../utils/basicUtils';
import { handleMediaMap, nestParamsPI, setAllUsers } from '../actions/paramActions';
import { useDispatch } from 'react-redux';

const PostImage = props => {
    const { usageType, createdBy, sessionType, usersList, className } = props

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(true);
    const [arrayBuffer, setArrayBuffer] = useState();
    const [mediaEncode, setMediaEncode] = useState();

    useEffect(() => {
    }, []);


    async function Main() {
        const file = document.querySelector('#myFile').files[0];
        setMediaEncode(await arrayBuffertoBase64(file));
    }


    const handleOnSubmit = () => {
        setIsLoaded(false)
        let postImageReq = {
            mediaEncode: mediaEncode,
            mediaType: arrayBuffer.type,
            usageType: usageType,
            createdBy: createdBy
        }

        if (sessionType === "profile") {
            let media = {mediaEncode: mediaEncode, mediaType: arrayBuffer.type}
            let newMap = handleMediaMap(usersList, createdBy, media)
            localStorage.setItem("usersList", JSON.stringify(newMap))
            dispatch(setAllUsers(newMap))
        }
        postImage(postImageReq)
            .then(() => setIsLoaded(true))
    };

    const onImageChange = async event => {
        let arrayBuffer = event
        setArrayBuffer(arrayBuffer)
        await Main()
    }

    const blob = !arrayBuffer ? null : new Blob([arrayBuffer])
    const srcBlob = !arrayBuffer ? null : URL.createObjectURL(blob);

    const hiddenFileInput = React.useRef(null);
    const handleClick = event => { hiddenFileInput.current.click(); };
    const handleChange = event => { const fileUploaded = event.target.files[0]; onImageChange(fileUploaded); };

    const inputField =
        <span className='mr-2'>
            <TextBtn variant="info" onClick={handleClick}>
                Select Profile Photo
            </TextBtn>
            <input type="file"
                id="myFile"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </span>

    return (
        <div className={className}>{!isLoaded ? <Loading /> :
            <span className='dfc jc-c ai-c'>
                <span className='df'>
                    {inputField}
                    <TextBtn variant="info" onClick={() => handleOnSubmit()}>Upload</TextBtn>
                </span>
                {!arrayBuffer ? null : <img className='p-3 bra-3' style={{ width: "150px", height: "150px" }} src={srcBlob} alt="preview" />}
            </span>
        }</div>
    )
}

export default PostImage;