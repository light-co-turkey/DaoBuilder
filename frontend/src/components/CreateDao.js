import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TextBtn } from "./ui/Buttons";
import { InputGroup, Input, InputPrep } from "./ui/Inputs";
import { AlertCard } from "./ui/Cards";
import { createDao } from "../actions/daoActions";

const CreateDao = props => {
    const dispatch = useDispatch();
    const errors = useSelector(e => e.errors)
    const auth = useSelector(e => e.auth)
    const [state, setState] = useState({
        title: "",
        handle: "",

        errors: {}
    })

    useEffect(() => {
        // If logged in and user navigates to Register page, should redirect them to dashboard
    }, [])

    const onChange = e => {
        const { id, value } = e.target
        setState({
            ...state, [id]: value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        const newDao = {
            title: state.title,
            handle: state.handle,
            owner: auth.user.id
        };
        dispatch(createDao(newDao));
    };

    return (
        <div className="dfc jc-c ai-c p-3 mxw-30r ma">
            <div>
                {errors.title ? (
                    <AlertCard variant="warning">
                        {errors.title}
                    </AlertCard>
                ) : null}
                {errors.handle ? (
                    <AlertCard variant="warning">
                        {errors.handle}
                    </AlertCard>
                ) : null}

            </div>
            <form noValidate onSubmit={onSubmit}>
                <div className="df jc-c">
                    <h4 className="mb-3 mt-3">
                        <b>Create Dao</b> Essential's
                    </h4>
                </div>
                <div className="dfc ai-c jc-c">
                    <InputGroup className="mb-3">
                        <InputPrep variant="pillL">Title</InputPrep>
                        <Input
                            variant="pillR"
                            onChange={onChange}
                            value={state.username}
                            id="title"
                            type="text"
                            placeholder="Title"
                        />
                    </InputGroup>
                    <InputGroup className="">
                        <InputPrep className="df" variant="pillL">Handle @</InputPrep>
                        <Input
                            variant="pillR"
                            onChange={onChange}
                            value={state.handle}
                            id="handle"
                            type="text"
                            placeholder="Handle"
                        />
                    </InputGroup>
                </div>
                <span className="df p-2 ai-c jc-c">
                    <TextBtn className="bra-1" variant="info" size="sm" type="submit">
                        Create
                    </TextBtn></span>
            </form>
        </div>

    );
}

export default CreateDao