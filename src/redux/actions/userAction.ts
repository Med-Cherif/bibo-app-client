import { actions } from "../slices/userSlice";
import { actions as postActions } from "../slices/postSlice";
import { actions as authActions } from "../slices/authSlice";
import { actions as notificationActions } from "../slices/notificationSlice";
import { AppDispatch, RootState } from "../store";
import * as apis from "../../api/userApi";
import { getUserPosts } from "../../api/postApi"
import { Socket } from "socket.io-client";
import { Dispatch } from "redux"

const handleErrors = (err: any) => {
    const error = err?.response?.data?.message || err?.message
    console.log(error)
    return error
}

export const searchForPeople = (query: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth: { accessToken } } = getState()
    try {
        const { data } = await apis.getSearchUsers(query, `Bearer ${accessToken!}`)
        dispatch(actions.getSearchedUsers(data.users))
    } catch (error) {
        dispatch(authActions.error(handleErrors(error)))
    }
}

export const searchForPeopleInSearchScreen = (query: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth: { accessToken } } = getState()
    try {
        const { data } = await apis.getSearchUsers(query, `Bearer ${accessToken!}`)
        dispatch(actions.getSearchedUsersScreen(data.users))
    } catch (error) {
        dispatch(authActions.error(handleErrors(error)))
    }
}

export const getUserData = (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth: { accessToken } } = getState()
    try {
        const { data } = await apis.getUserData(id, `Bearer ${accessToken!}`)
        const { _id, username, name, picture, followings, followers, description } = data.user
        dispatch(actions.getUserData({_id, username, name, picture, followings, followers, description: description ? description : 'No Bio'}))

        const { data: postsData } = await getUserPosts(id,`Bearer ${accessToken!}`)
        dispatch(postActions.getUserPosts(postsData.posts))
        
    } catch (error) {
        dispatch(authActions.error(handleErrors(error)))
    }
}

export const followUser = (socket: Socket, dispatch?: Dispatch) => {
    return {
        emitting: ({ followerId, userId }: { followerId: string, userId: string }) => {
            if (followerId === userId) return;
            return socket.emit('follow user', { followerId, userId });
        },
        // when i follow i get data of the one i followed
        listening: () => socket.on('follow user', (userId) => {
            if (dispatch) {
                dispatch(actions.followUser(userId))
            }
        }),
        // when i get followed
        gettingFollowed: (setNotificationSnackbar: React.Dispatch<React.SetStateAction<{
            message: string;
            open: boolean;
        }>>) => socket.on('get followed', (notification) => {
            console.log(notification)
            if (dispatch) {
                dispatch(notificationActions.getNotification(notification))
            }
            setNotificationSnackbar({
                open: true,
                message: notification.message
            })
        })
    }
}

export const unfollowUser = (socket: Socket, dispatch?: Dispatch) => {
    return {
        emitting: ({unfollowerId, userId}: { unfollowerId: string, userId: string }) => socket.emit('unfollow user', ({ unfollowerId, userId })),
        listening: () => socket.on('unfollow user', (userId) => {
            if (dispatch) {
                dispatch(actions.unfollowUser(userId))
            }
        })
    }
}

export const updateUserDataAction = (field: 'email' | 'name' | 'username' | 'description', value: string, endEditing: () => void) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()
    try {
        const { data } = await apis.updateUser(auth.userData!._id, {
            [field]: value
        }, auth.accessToken!)
        dispatch(authActions.authSuccess({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        }))
        endEditing()
    } catch (error: any) {
        let err = error?.response?.data?.message || error?.message
        dispatch(actions.userError(err))
    }
}

export const updateUserPasswordAction = (data: apis.UpdatePasswordData, cb: () => void) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth, user } = getState()
    
    try {
        await apis.updateUserPassword(auth.userData!._id, data, auth.accessToken!)
        if (user.error) {
            dispatch(actions.resetError())
        }
        cb()
    } catch (error: any) {
        let err = error?.response?.data?.message || error?.message
        dispatch(actions.userError(err))
    }
}

export const changeProfilePictureAction = (file: FormData) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()

    try {
        const { data } = await apis.updateProfilePicture(auth.userData!._id, file, auth.accessToken!)
        dispatch(authActions.authSuccess({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        }))
    } catch (error: any) {
        let err = error?.response?.data?.message || error?.message
        dispatch(actions.userError(err))
    }
}

export const getUserContactAction = (userId: string, type: "followings" | "followers") => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(actions.loading())
    const { auth } = getState()
    const accessToken = auth.accessToken!;
    try {
        const { data } = await apis.getUserContact(userId, type, accessToken);
        console.log(data)
        dispatch(actions.getUserContact({
            type: data.type,
            [data.type]: data[data.type]
        }))
    } catch (error) {
        handleErrors(error)
    }
}

export const getMyFollowingsAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState();

    try {
        const { data } = await apis.getMyFollowings(auth.userData!._id, auth.accessToken!)
        dispatch(actions.getMyFollowings(data.followings))
    } catch (error) {
        handleErrors(error)
    }
}