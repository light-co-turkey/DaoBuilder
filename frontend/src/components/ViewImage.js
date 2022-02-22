import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { nestUserPI } from '../actions/paramActions';

const ViewImage = props => {
    const { createdBy, usageType, usersList, variant, size } = props

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(true);
    const [mediaEncode, setMediaEncode] = useState(null);
    const [mediaType, setMediaType] = useState(null);

    let verUserPI = variant === "userPI"

    let sizee = size === "lg" ? {
        width: "150px", height: "150px"
    } : size === "md" ? {
        width: "100px", height: "100px"
    } : {
        width: "70px", height: "70px"
    }

    let handleSets = async x => {
        setMediaEncode(x.mediaBuffer)
        setMediaType(x.mediaType)
    }

    const handleOnLoad = () => {
        setIsLoaded(false)
        dispatch(nestUserPI({handleSets, usageType, usersList, createdBy, setIsLoaded}))
    };

    useEffect(() => {
        handleOnLoad()
    }, []);

    /* let baseToImg = `data:${mediaType};base64,${mediaEncode}`*/
    return (
        <>{!isLoaded ? <Loading /> :
            <span className='dfc jc-c ai-c'>
                {!mediaEncode || !mediaType ? null :
                    <img className='bra-3' style={sizee} src={mediaEncode} alt="general-media" />}
            </span>
        }</>
    )
}

export default ViewImage;