import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled, Card, Divider } from "@mui/material"
import ChatCardHeader from "./ChatCardHeader";
import ChatCardContent from "./ChatCardContent";
import { handleChat, handleMessage } from "../../redux/actions/chatAction"
import { useGlobalState } from "../../context/AppContext";
import { RootState } from "../../redux/store";
import { actions as chatActions } from "../../redux/slices/chatSlice"
import ChatInput from "./ChatInput";

const BoxStyled = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%'
}))

interface IProps {
    searchParams: URLSearchParams;
    handleClosingChat: (cb: () => void) => void;
    onWriteMessageState: { [chatID: string]: boolean }
}

const ChatBox = ({ searchParams, handleClosingChat, onWriteMessageState }: IProps) => {
    const { chat } = useSelector((state: RootState) => state.chat)
    const { userData } = useSelector((state: RootState) => state.auth)
    const { socket } = useGlobalState()
    const dispatch = useDispatch()

    const myID = userData!._id;

    const messagesContainerRef = useRef<HTMLDivElement>(null)

    const handleScrollChat = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
    }

    useEffect(() => {
        if (searchParams.get('user') && userData) {
            handleChat(socket).emitting({ starterId: userData._id, userId: searchParams.get('user')! });
            handleChat(socket, dispatch).listeningExixtsChat();
            handleChat(socket, dispatch).listeningNewChat();
        }
    }, [searchParams])

    useEffect(() => {
        handleMessage(socket, dispatch).listeningUndefinedChat(userData!._id, handleScrollChat);
        handleMessage(socket, dispatch).listeningExixtsChat(handleScrollChat);
    }, [])

    useEffect(() => {
        handleScrollChat()
    }, [searchParams, chat, onWriteMessageState])

    useEffect(() => {
        if (chat) {
            if (chat?.messages[chat?.messages?.length - 1]?.sender !== myID) {
                handleMessage(socket).seenMessage(chat);

                socket.on('seen message', ({chatID, messageID}) => {
                    dispatch(chatActions.seenMessage({
                        chatID, messageID
                    }))
                })
            }
        }
    }, [chat])
    
    return (
        <BoxStyled>
            {
                chat && (
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <ChatCardHeader handleClosingChat={handleClosingChat} />
                        <Divider sx={{ marginTop: '6px' }} />
                        <ChatCardContent onWriteMessageState={onWriteMessageState} messagesContainerRef={messagesContainerRef} />
                        <ChatInput />
                    </Card>
                )
            }
        </BoxStyled>
    )
}

export default ChatBox
