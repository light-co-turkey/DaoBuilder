import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from 'draft-js';
import axios from "axios";
import { mongoDateToHuman } from "../utils/basicUtils";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import PostMetaView from "./PostMetaView";


const PostView = () => {
    const { id } = useParams();
    const param = useSelector(state => state.param)
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState(false);
    const [postMeta, setPostMeta] = useState(null)

    let postId = id
    const getPost = async () => {
        setIsLoaded(false)
        axios
            .get(`/api/posts/get_post/${postId}`)
            .then(res => {
                let data = res.data
                const contentState = convertFromRaw(JSON.parse(data.draftJsRaw));
                const editorState = EditorState.createWithContent(contentState);
                let newPostMeta = {
                    createdAt: data.createdAt,
                    createdBy: data.createdBy
                }
                setPostMeta(newPostMeta)
                setPost(editorState)
            })
            .then(setIsLoaded(true))
    };

    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
    }, [isLoaded]);

    return (
        <div className="dfc ai-c jc-c">
            {!isLoaded || !postMeta ? <Loading /> :
                <div style={{ padding: '2px', minHeight: 'max-content', width: "100vw" }}>
                    <PostMetaView isLoaded={isLoaded} postMeta={postMeta} usersList={param.usersList} />
                    <Editor toolbarHidden editorState={post} readOnly={true} />
                </div>}
        </div>
    );
};

export default PostView;