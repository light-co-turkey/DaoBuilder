import React, { useState, useEffect } from 'react';
import { LinkTextBtn, TextBtn } from './ui/Buttons';
import { useSelector, useDispatch } from "react-redux";
import ViewImage from "./ViewImage";

const ListDaos = (props) => {
    const dispatch = useDispatch()
    const param = useSelector(state => state.param)
    const { daosList, isLoaded } = param;

    useEffect(() => {
    }, []);

    return (
        <div>
            <h4 className="p-3">Daos List</h4>
            {param.daosList.length <= 0 || param.isLoaded ? <h3>No daos yet.</h3>
                :
                <div>
                    <div className="dfc jc-c ai-c">
                        {param.daosList.map((i) => {
                            return (
                                <div className="df jc-c ai-c w-100 pbt-2 mxw-400" key={i._id}>
                                    <ViewImage isLoaded={isLoaded} createdBy={i.owner} daosList={daosList} usageType="daoPI" size="sm" />
                                    <span>
                                        <p className='ml-3'>{i.title}</p>
                                        <p className='ml-3'>{"@" + i.handle}</p>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>}
        </div>
    );
};

export default ListDaos;