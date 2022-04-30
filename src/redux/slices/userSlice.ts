import { createSlice } from "@reduxjs/toolkit"
import { UserData } from "./authSlice"

interface searchedUser {
    _id: string,
    username: string,
    name: string,
    picture: string,
}

interface UserProfileData extends UserData {
    followings: number;
    followers: number;
    description: string;
}

interface UserContact extends searchedUser {
    followings: string[],
    followers: string[]
}

interface InitState {
    searchedUsers: searchedUser[],
    searchedUsersScreen: searchedUser[],
    userProfileData: UserProfileData | null,
    isLoading: boolean,
    error: any,
    myFollowings: string[],
    followings: UserContact[],
    followers: UserContact[]
}

export const initialState: InitState = {
    searchedUsers: [],
    searchedUsersScreen: [],
    userProfileData: null,
    isLoading: false,
    error: null,
    followings: [],
    followers: [],
    myFollowings: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loading: (state) => {
            state.error = null;
            state.isLoading = true
        },
        getSearchedUsers: (state, action) => {
            state.searchedUsers = action.payload
        },
        getSearchedUsersScreen: (state, action) => {
            state.searchedUsersScreen = action.payload
        },
        getUserData: (state, action) => {
            state.userProfileData = action.payload
        },
        getUserContact: (state, action) => {
            type Type = "followings" | "followers";
            const type = action.payload.type as Type;
            state[type] = action.payload[type];
            state.isLoading = false;
        },
        followUser: (state, action) => {
            if (state.userProfileData && state.userProfileData?._id === action.payload) {
                state.userProfileData.followers = state.userProfileData.followers + 1;
            }
            state.myFollowings = [...state.myFollowings, action.payload];
        },
        unfollowUser: (state, action) => {
            if (state.userProfileData && state.userProfileData?._id === action.payload) {
                state.userProfileData.followers = state.userProfileData.followers - 1;
            }
            state.myFollowings = state.myFollowings.filter((userID) => userID !== action.payload);
        },
        userError: (state, action) => {
            state.error = action.payload
        },
        getMyFollowings: (state, action) => {
            state.myFollowings = action.payload
        },
        resetError: (state) => {}
    }
})

export const actions = userSlice.actions
export const userReducer = userSlice.reducer