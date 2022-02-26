import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import Loading from '../components/Loading';
import PostImage from '../components/PostImage';
import ViewImage from '../components/ViewImage';

import { TextBtn } from "../components/ui/Buttons"
import { InputGroup, InputPrep } from '../components/ui/Inputs';
import { filterSingleItem } from '../utils/basicUtils';

export const Profile = e => {
    const dispatch = useDispatch();
    const history = useHistory();
    const param = useSelector(state => state.param);
    const user = useSelector(state => state.user);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLogoutClick = e => {
        e.preventDefault();
        dispatch(logoutUser());
    };

    let filtered = filterSingleItem(param.usersList, user.raw._id)
    let checkUPI = filtered && filtered.mediaBuffer

    return (
        <div className="jc-c dfc plr-3 pt-2">
            <div className="df ai-c">
                <TextBtn
                    className="mla" variant="warning" size="md"
                    onClick={(e) => { onLogoutClick(e); history.push("/") }}>
                    Logout</TextBtn>
            </div>
            {!user.isLoaded ? <Loading /> :
                <div className="dfc jc-c p-3 mt-3">
                    {!checkUPI ? null : <PostImage className="mb-3" usageType="userPI" createdBy={user.raw._id} sessionType="profile" usersList={param.usersList} />}
                    {checkUPI ? null : <ViewImage size="lg" className='p-3' usageType="userPI" createdBy={user.raw._id} usersList={param.usersList} />}
                    <h5 className='pb-3'>{user.raw.name} {user.raw.surname}</h5>
                    <InputGroup className="pb-3">
                        <InputPrep variant="pillL">Email</InputPrep>
                        <InputPrep variant="pillR">{user.raw.email}</InputPrep>
                    </InputGroup>
                    {!user.raw.phone ? null : <InputGroup>
                        <InputPrep variant="pillL">Phone</InputPrep>
                        <InputPrep variant="pillR">{user.raw.phone}</InputPrep>
                    </InputGroup>}
                </div>}
        </div>
    )
}
