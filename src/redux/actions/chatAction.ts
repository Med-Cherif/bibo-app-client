import * as apis from "../../api/chatApi";
import { AppDispatch, RootState } from "../store";
import { actions } from "../slices/chatSlice";
import { Socket } from "socket.io-client";
import { Dispatch } from "@reduxjs/toolkit";

const chatResponse = (chat: any, myID: string) => {
    return {
        _id: chat._id,
        user: {
            _id: chat.joinedUsers[0]._id === myID ? chat.joinedUsers[1]._id :  chat.joinedUsers[0]._id,
            username: chat.joinedUsers[0]._id === myID ? chat.joinedUsers[1].username :  chat.joinedUsers[0].username,
            picture: chat.joinedUsers[0]._id === myID ? chat.joinedUsers[1].picture :  chat.joinedUsers[0].picture,
        },
        lastMessage: chat.lastMessage
    };
}

export const getChatsAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth: { accessToken, userData } } = getState()

    if (!accessToken) return

    // for sidebarchat
    let result: any = []

    try {
        const { data: { chats } } = await apis.getChats(userData!._id, accessToken)
        Array.prototype.forEach.call(chats, function(chat) {
            const res = chatResponse(chat, userData!._id);
            result.push(res);
        })
        dispatch(actions.getChats(result))
    } catch (error) {
        console.log(error)
    }
}

export const handleChat = (socket: Socket, dispatch?: Dispatch) => {
    return {
        emitting: ({starterId, userId}: {starterId: string, userId: string}) => socket.emit('start chat', { starterId, userId }, ({ error }: any) => {
            if (error) {
                console.log(error)
            }
        }),

        // if there are already messages in the conversation
        listeningExixtsChat: () => socket.on('start exixts chat', ({ user, messages, accepted }) => {
            let conversation = {
                _id: messages[0].chatId,
                user,
                messages,
            }
            if (dispatch) {
                dispatch(actions.getChat(conversation))
            }
        }),

        // if there is no message at all
        listeningNewChat: () => socket.on('start new chat', ({ user }) => {
            let newConversation = {
                _id: null,
                user,
                messages: [],
            }
            if (dispatch) {
                dispatch(actions.getChat(newConversation))
            }
        }),
        // for requests messages screeen;
        receivingNewRequestedChat: (myID: string) => socket.on('receiver new chat', (chat) => {
            if (dispatch) {
                const result = chatResponse(chat, myID);
                dispatch(actions.getNewChat(result))
            }
        })
    }
}

export const handleMessage = (socket: Socket, dispatch?: Dispatch) => {
    return {
        emitting: ({ senderId, toId, content, chatId }: { senderId: string, toId: string | null, content: string, chatId: string | null }) => (
            socket.emit('send message', { senderId, toId, content, chatId }, ({ error }: any) => {
                console.log(error)
            })
        ),
        listeningExixtsChat: (handleScrollChat: () => void) => (
            socket.on('receive message', (message) => {
                if (dispatch) {
                    dispatch(actions.receiveMessage(message))
                    handleScrollChat()
                }
            })
        ),
        listeningUndefinedChat: (myID: string, handleScrollChat: () => void) => (
            socket.on('create chat', ({ chat, message }) => {
                if (dispatch) {
                    const res = chatResponse(chat, myID)
                    dispatch(actions.createNewChat({
                        _id: message.chatId,
                        message,
                        chat: res
                    }))
                    handleScrollChat()
                }
            })
        ),
        listeningNewChatMessage: (myID: string) => {
            socket.on('receive chat', (chat) => {
                if (dispatch) {
                    const res = chatResponse(chat, myID)
                    dispatch(actions.receiveChatMessage(res))
                }
            })
        },
        seenMessage: (chat: any) => {
            socket.emit('seen message', { 
                chatID: chat._id, 
                messageID: chat?.messages[chat?.messages?.length - 1]?._id,
                userID: chat.user._id
            })
        }
    }
}