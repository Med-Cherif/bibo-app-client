import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    chat: null,
    chats: [],
    requestedChats: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        getChats: (state, action) => {
            state.chats = action.payload;
        },
        getRequestedChats: (state, action) => {
            state.requestedChats = action.payload;
        },
        getChat: (state, action) => {
            state.chat = action.payload;
        },
        createNewChat: (state, action) => {
            state.chats = [action.payload.chat, ...state.chats];
            state.chat = {
                ...state.chat, // messages: [], _id: null, user: data
                _id: action.payload._id,
                messages: [...state.chat.messages, action.payload.message]
            };
        },
        acceptChat: (state, action) => {
            const chatId = action.payload;
            const chat = state.requestedChats.find((chat: any) => {
                return chat._id === chatId
            });
            state.requestedChats = state.requestedChats.filter((chat: any) => {
                return chat._id === chatId
            });
            state.chats = [chat, ...state.chats];
            state.chat = { ...state.chat, hasPowers: true }
        },
        getNewRequestedChat: (state, action) => {
            state.requestedChats = [action.payload, ...state.requestedChats];
        },
        receiveMessage: (state, action) => {
            if (action.payload.chatId === state.chat._id) {
                state.chat.messages = [...state.chat.messages, action.payload];
            }
        },
        receiveChatMessage: (state, action) => {
            const chat = state.chats.find((chat: any) => chat._id === action.payload._id);
            const filteredChats = state.chats.filter((chat: any) => chat._id !== action.payload._id);
            const chats = [chat, ...filteredChats];
            state.chats = chats.map((chat: any) => {
                if (chat._id === action.payload._id) {
                    return { ...chat, lastMessage: action.payload.lastMessage }
                }
                return chat;
            });
        },
        seenMessage: (state, action) => {
            const { chatID, messageID } = action.payload
            if (chatID === state.chat._id) {
                state.chat = {...state.chat, messages: state.chat.messages.map((message: any) => {
                    if (message._id === messageID) {
                        return {...message, seen: true}
                    }
                    return message;
                })}
            }
        },
        resetChat: (state) => {
            state.chat = null;
        },
    }
})

export const actions = chatSlice.actions
export const chatReducer = chatSlice.reducer