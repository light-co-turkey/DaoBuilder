import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { nestParamsPI } from '../actions/paramActions';

const ViewImage = props => {
    const { createdBy, usageType, usersList, daosList, variant, size, className } = props

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(true);
    const [mediaEncode, setMediaEncode] = useState(null);
    const [mediaType, setMediaType] = useState(null);

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
        if (usersList) {dispatch(nestParamsPI({setIsLoaded, handleSets, usageType, usersList, createdBy}))}
        if (daosList) {dispatch(nestParamsPI({setIsLoaded, handleSets, usageType, daosList, createdBy}))}
    };

    useEffect(() => {
        handleOnLoad()
    }, []);

    /* let baseToImg = `data:${mediaType};base64,${mediaEncode}`*/
    return (
        <>{!isLoaded ? <Loading /> :
            <span className={'dfc jc-c ai-c ' + className}>
                {!mediaEncode || !mediaType ? null :
                    <img className='bra-3' style={sizee} src={mediaEncode} alt="general-media" />}
            </span>
        }</>
    )
}

export default ViewImage;