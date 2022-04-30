import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from "socket.io-client";
import { RootState } from '../redux/store';
import { actions } from '../redux/slices/notificationSlice';
import { followUser, unfollowUser } from '../redux/actions/userAction';
import API_URL from '../config';

const resetComments = createAction('reset comments')

const socket = io(API_URL, { autoConnect: false });

interface AppState {
    isOpenPostCreator: boolean;
    openPostCreator: () => void;
    closePostCreator: (cb: () => void) => void;
    isSearchBoxOpen: boolean;
    openSearchBox: () => void
    closeSearchBox: () => void,
    socket: Socket,
    notificationSnackbar: {
        message: string;
        open: boolean
    };
    setNotificationSnackbar: React.Dispatch<React.SetStateAction<{
        message: string;
        open: boolean;
    }>>

    commentsVisible: boolean;
    commentPostID: React.MutableRefObject<string | null>
    showComments: (postID: string) => void;
    hideComments: () => void;

}

interface IProps {
    children: React.ReactNode
}

const AppContext = createContext({})

const AppProvider = ({ children }: IProps) => {
    const [isOpenPostCreator, setIsOpenPostCreator] = useState(false);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

    const commentPostID = useRef<string | null>(null)

    const [commentsVisible, setCommentsVisible] = useState(false);

    const [notificationSnackbar, setNotificationSnackbar] = useState({
        message: "",
        open: false
    })
    
    const { accessToken, userData} = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    const showComments = (postID: string) => {
        setCommentsVisible(true);
        commentPostID.current = postID
    }
    const hideComments = () => {
        setCommentsVisible(false);
        commentPostID.current = null;
        dispatch(resetComments());
    } 

    const openSearchBox = () => setIsSearchBoxOpen(true)
    const closeSearchBox = () => setIsSearchBoxOpen(false)

    const closePostCreator = (cb: () => void) => {
        setIsOpenPostCreator(false);
        cb()
    };
    const openPostCreator = () => {
        setIsOpenPostCreator(true);
    };

    useEffect(() => {
        followUser(socket, dispatch).listening()
        followUser(socket, dispatch).gettingFollowed(setNotificationSnackbar)
        unfollowUser(socket, dispatch).listening()

        socket.on('like post notification', (notification) => {
            dispatch(actions.getNotification(notification))
        })

        return () => {
            socket.offAny()
        }
    }, [])

    useEffect(() => {
        if (accessToken && userData) {
            socket.auth = { userId: userData._id }
            socket.connect()
        }
        
    }, [accessToken, userData])

    return (
        <AppContext.Provider value={{
            isOpenPostCreator, 
            openPostCreator, 
            closePostCreator,
            isSearchBoxOpen,
            openSearchBox,
            closeSearchBox,
            socket,
            setNotificationSnackbar,
            notificationSnackbar,
            commentsVisible,
            showComments,
            hideComments,
            commentPostID
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider

export const useGlobalState = () => {
    return useContext(AppContext) as AppState
}
