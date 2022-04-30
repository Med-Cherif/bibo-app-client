import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode";
import { getAccessToken, getRefreshToken, getUserData } from "../../utils/authHelpers"

export interface UserData {
    _id: string;
    username: string;
    email: string;
    name: string;
    picture: string;
    description: string;
}

interface InitState {
    accessToken: string | null;
    refreshToken: string | null;
    userData: UserData | null
    loading: {
        type: string;
        isLoading: boolean;
    };
    error: {
        type: "auth-error" | "";
        message: string | string[] | null;
    };
}

const initialState: InitState = {
    accessToken: getAccessToken() || null,
    refreshToken: getRefreshToken() || null,
    userData: getUserData() || null,
    loading: {
        isLoading: false,
        type: ""
    },
    error: {
        type: "",
        message: null
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loading: (state, action) => {
            state.loading = {
                isLoading: true,
                type: action.payload
            }
            state.error = {
                type: "",
                message: null
            }
        },
        error: (state, action) => {
            state.loading = {
                type: "",
                isLoading: false,
            }
            state.error = {
                type: action.payload.type,
                message: action.payload.message
            }
        },
        authSuccess: (state, { payload: { accessToken, refreshToken } }) => {
            state.loading = {
                isLoading: false,
                type: ""
            }
            localStorage.setItem('bibotoken', JSON.stringify({accessToken, refreshToken}))
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.userData = jwtDecode(accessToken)
        },
        logout: state => {
            // i did reset the state on the store
            localStorage.removeItem('bibotoken')
        },
    }
})

export const actions = authSlice.actions
export const authReducer = authSlice.reducer