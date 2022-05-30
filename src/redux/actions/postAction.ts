import { actions } from "../slices/postSlice";
import * as apis from "../../api/postApi";
import { AppDispatch, RootState } from "../store";
import { Socket } from "socket.io-client";
import { NavigateFunction } from "react-router-dom";

const handleErrors = (err: any) => {
    const message = err?.response?.data?.message || err?.message
    return message
}

export const getPublicPostsAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()
    try {
        const { data } = await apis.getPublicPosts(auth.userData!._id, auth.accessToken!)
        dispatch(actions.getPublicPosts(data.posts))
    } catch (error) {
        handleErrors(error)
    }
}

export const createPostAction = (content: string | null, file: File | null, closePostCreator: () => void) => async (dispatch: AppDispatch, getState: () => RootState) => {

    const { auth, user } = getState()

    const creator = auth.userData!._id;

    if (!file && !content) return;

    let formData: FormData | { creator: string, content: string };
    let hasFile = false;

    if (file) {
        hasFile = true;
        formData = new FormData()
        formData.append('creator', creator)
        formData.append('post-media', file)
        content && formData.append('content', content)
    } else {
        hasFile = false;
        formData = {
            creator,
            content: content ? content : ""
        }
    }
    
    try {
        const { data } = await apis.createPost(formData, hasFile, auth.accessToken!)
        const isUser = user!.userProfileData?._id === auth.userData!._id ? true : false
        
        dispatch(actions.createPost({
            post: data.post,
            isUser
        }))
        closePostCreator()
    } catch (error) {
        handleErrors(error)
    }
}

export const getPostAction = (postId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()
    try {
        const { data } = await apis.getPost(postId, auth.accessToken!)
        dispatch(actions.getPost(data.post))
    } catch (error) {
        handleErrors(error)
    }
}

export const likeAndUnlikePostAction = (postId: string, socket?: Socket) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()

    try {
        const { data } = await apis.likeAndUnlikePost({ postId, userId: auth.userData!._id }, auth.accessToken!)
        if (data.type === 'like') {
            dispatch(actions.likePost(data))
            if (socket) {
                if (auth.userData!._id !== data.post.creator) {
                    socket.emit('like post notification', {
                        user: {
                            _id: auth.userData!._id,
                            username: auth.userData!.username,
                            picture: auth.userData!.picture,
                        },
                        post: {
                            _id: data.post._id,
                            creator: data.post.creator,

                            media: data.post?.media,
                        }
                    })
                }
            }
        }
        else if (data.type === 'unlike') {

            dispatch(actions.unlikePost(data))
        }
    } catch (error) {
        handleErrors(error)
    }
}


export const dislikeAndUndislikePostAction = (postId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()

    try {
        const { data } = await apis.dislikeAndUndislike({ postId, userId: auth.userData!._id }, auth.accessToken!)
        if (data.type === 'dislike') {
            dispatch(actions.dislikePost(data))
        }
        else if (data.type === 'undislike') {
            dispatch(actions.undislikePost(data))
        }
    } catch (error) {
        handleErrors(error)
    }
}


export const deletePostAction = (postId: string, isInPostScreen: boolean, navigate: NavigateFunction) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth, user } = getState()

    try {
        await apis.deletePost(postId, auth.accessToken!)
        const isInProfileScreen = auth.userData!._id === user.userProfileData?._id ? true : false;
        
        dispatch(actions.deletePost({
            postId,
            isInProfileScreen,
            isInPostScreen
        }))
        if (isInPostScreen) {
            navigate(-1)
        }
    } catch (error) {
        handleErrors(error)
    }
}

export const updatePostAction = (postId: string, newContent: string, cb: () => void) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth, user } = getState()

    try {
        await apis.updatePost(postId, newContent, auth.accessToken!)
        let isInProfileScreen = false;

        if (auth.userData!._id === user.userProfileData?._id) {
            isInProfileScreen = true;
        }

        dispatch(actions.updatePost({
            postId,
            newContent,
            isInProfileScreen
        }))
        cb()
    } catch (error) {
        handleErrors(error)
    }
}

export const getCommentsAction = (postID: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()
    try {
        const { data } = await apis.getComments(postID, auth.accessToken!);
        dispatch(actions.getComments(data.comments))
    } catch (error) {
        handleErrors(error)
    }
}


export const deleteCommentAction = ({ commentID, postID }: { commentID: string, postID: string }) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()
    try {
        await apis.deleteComment(commentID, auth.accessToken!);
        dispatch(actions.deleteComment({commentID, postID}))
    } catch (error) {
        handleErrors(error)
    }
}