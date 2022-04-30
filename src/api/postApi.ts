import axios from "axios";
import API_URL from "../config";

const postApi = `${API_URL}/api/posts`;

const globalApi = `${API_URL}/api`;


export const getPublicPosts = (userId: string, token: string) => axios.get(`${postApi}/public/${userId}`, { headers: { authorization: 'Bearer' + ' ' + token } })
export const getUserPosts = (userId: string, token: string) => axios.get(`${postApi}/${userId}`, { headers: { authorization: 'Bearer' + ' ' + token } })

export const createPost = (formData: FormData | { creator: string, content: string }, hasFile: boolean, token: string) => { 

    let apiURL: string;
    if (hasFile) {
        apiURL = `${postApi}?hasFile=${true}`
    } else {
        apiURL = `${postApi}/`
    }

    return axios.post(apiURL, formData, { headers: { authorization: 'Bearer' + ' ' + token } })
}
export const deletePost = (postId: string, token: string) => axios.delete(postApi + '/' + postId, { headers: { authorization: 'Bearer' + ' ' + token } })

export const updatePost = (postId: string, newContent: string, token: string) => axios.patch(postApi + '/' + postId, { newContent }, { headers: { authorization: 'Bearer' + ' ' + token } })
export const getPost = (postId: string, token: string) => axios.get(postApi + '/single/' + postId, { headers: { authorization: 'Bearer' + ' ' + token } })
export const likeAndUnlikePost = (data: { postId: string, userId: string }, token: string) => axios.post(postApi + '/reaction/like', data, { headers: { authorization: 'Bearer' + ' ' + token } })
export const dislikeAndUndislike = (data: { postId: string, userId: string }, token: string) => axios.post(postApi + '/reaction/dislike', data, { headers: { authorization: 'Bearer' + ' ' + token } })

export const getComments = (postId: string, token: string) => {
    return axios.get(`${postApi}/${postId}/comments`, { headers: { authorization: 'Bearer' + ' ' + token } })
}

export const deleteComment = (commentId: string, token: string) => {
    return axios.delete(`${globalApi}/comments/${commentId}`, { headers: { authorization: 'Bearer' + ' ' + token } })
}