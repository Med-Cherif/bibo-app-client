import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit"
import { authReducer } from "./slices/authSlice"
import { userReducer } from "./slices/userSlice"
import { chatReducer } from "./slices/chatSlice"
import { postReducer } from "./slices/postSlice"
import { notificationReducer } from "./slices/notificationSlice"
import { callReducer } from "./slices/callSlice"

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    post: postReducer,
    notifiction: notificationReducer,
    call: callReducer
})

const rootReducer = (state: ReturnType<typeof appReducer>, action: AnyAction) => {
    if (action.type === 'auth/logout') {
        return appReducer(undefined, action)
    }
    if (action.type === 'reset comments') {
        state = {
            ...state,
            post: {
                ...state.post,
                comments: []
            }
        }
    }
    return appReducer(state, action)
}

const store = (configureStore as any)({
    reducer: rootReducer,
})

export default store

export type RootState = ReturnType<typeof appReducer>
export type AppDispatch = typeof store.dispatch