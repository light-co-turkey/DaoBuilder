import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Loading from '../components/Loading';
import { TextBtn } from "../components/ui/Buttons"
import { InputGroup, InputPrep } from '../components/ui/Inputs';

export const ManageDao = e => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="">
        </div>
    )
}