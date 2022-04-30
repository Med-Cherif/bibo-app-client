import { createSlice } from "@reduxjs/toolkit";

interface User {
    _id: string, name: string, username: string, picture: string
}

interface InitState {
    receivingCall: {
        type: 'video' | 'audio' | null,
        isReceiving: boolean
    },
    isVideoCall: boolean,
    isAudioCall: boolean,
    sdp: RTCSessionDescriptionInit | null,
    otherUser: User | null;
    caller: User | null;
    calling: {
        type: 'audio' | 'video' | null,
        isCalling: boolean,
        userID: null | string
    }
}

const initialState: InitState = {
    receivingCall: {
        type: null,
        isReceiving: false
    },
    sdp: null,
    isVideoCall: false,
    isAudioCall: false,
    otherUser: null,
    caller: null,
    calling: {
        isCalling: false,
        type: null,
        userID: null
    }
}

const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        callUser: (state, action) => {
            state.calling = {
                isCalling: true,
                type: action.payload.callType,
                userID: action.payload.userID
            }
        },
        receivingCall: (state, action) => {
            const call = action.payload as {
                type: 'audio' | 'video',
                caller: {
                    _id: string,
                    username: string,
                    name: string,
                    picture: string
                },
                sdp: RTCSessionDescriptionInit
            };
            state.receivingCall = {
                type: call.type,
                isReceiving: true
            }
            state.caller = call.caller
            state.otherUser = call.caller
            state.sdp = call.sdp
        },
        acceptVideoCall: (state) => {
            state.receivingCall = {
                isReceiving: false,
                type: null
            };
            state.isVideoCall = true;
        },
        acceptVoiceCall: (state) => {
            state.receivingCall = {
                isReceiving: false,
                type: null
            };
            state.isAudioCall = true;
        },
        gettingAnswerVideoCall: (state, action) => {
            state.otherUser = action.payload
            state.calling = {
                isCalling: false,
                type: null,
                userID: null
            }
            state.isVideoCall = true
        },
        gettingAnswerVoiceCall: (state, action) => {
            state.otherUser = action.payload
            state.calling = {
                isCalling: false,
                type: null,
                userID: null
            }
            state.isAudioCall = true
        },
        endCall: (state) => {
            state.receivingCall = {
                type: null,
                isReceiving: false
            }
            state.sdp = null
            state.isVideoCall = false
            state.isAudioCall = false
            state.caller = null
            state.otherUser = null
            state.calling = {
                isCalling: false,
                type: null,
                userID: null
            }
        }
    }
})

export const callActions = callSlice.actions;
export const callReducer =  callSlice.reducer;