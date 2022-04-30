import { createSlice } from "@reduxjs/toolkit";

export interface NotificationType {
    _id: string;
    user: string;
    user2: {
        _id: string; picture: string
    };
    message: string;
    action: 'likingPost' | 'followingUser',
    post?: {
        _id: string,
        media: {
            mimetype: string;
            path: string
        } | null
    },
    seen: boolean
}

const initialState: { notifications: NotificationType[] } = {
    notifications: []
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        getNotifications: (state, action) => {
            state.notifications = action.payload
        },
        getNotification: (state, action) => {

            // delete duplicated notifications
            let newNotification = state.notifications.filter((notification, i) => {
                if (notification.action === 'followingUser') return true
                const { user, user2, post } = notification
                const { user: userPayload, user2: user2Payload, post: postPayload } = action.payload
                if (userPayload === user && user2._id === user2Payload._id && post!._id === postPayload._id) return false
                return true
            })
            state.notifications = [action.payload, ...newNotification]
        }
    }
})

export const actions = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer