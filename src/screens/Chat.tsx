import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom"
import { Box, styled, Container } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar"
import ChatSidebar from "../components/Chat/ChatSidebar";
import Navbar from "../components/Navbar/Navbar";
import ChatBox from "../components/Chat/ChatBox";
import { handleChat, handleMessage } from "../redux/actions/chatAction"
import { RootState } from "../redux/store"
import { useGlobalState } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";

const BoxWrapper = styled(Box)({
    height: 'calc(100vh - 64px)',
})

const BoxGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    height: '100%',
    gridTemplateColumns: '300px 1fr',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard
    })
}))

const BoxSidebar = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        gridColumn: '1 / 3',
        gridRow: '1 / 3',
    }
}))

const BoxChatbox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
    height: 'calc(100vh - 64px)',
    [theme.breakpoints.down('md')]: {
        padding: 0,
        transform: 'translateX(100%)',
        gridColumn: '1 / 3',
        gridRow: '1 / 3'
    }
}))

function isChatOpen(userId: string | null) {
    if (userId) {
        return true
    }
    return false
}

const Chat = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isExistsChat, setIsExixtsChat] = useState(() => isChatOpen(searchParams.get('user')))
    const [onWriteMessageState, setOnWriteMessageState] = useState<{ [chatID: string]: boolean }>({})

    const { socket } = useGlobalState();
    const dispatch = useDispatch();
    const { userData } = useSelector((state: RootState) => state.auth)

    const boxGridRef = useRef<HTMLDivElement>(null)
    const checkIsExistsChat = () => {
        if (searchParams.get('user')) {
            setIsExixtsChat(true)
        } else {
            setIsExixtsChat(false)
        }
    }

    // for mobile screen
    const handleClosingChat = (resetChat: () => void) => {
        if (boxGridRef.current) {
            boxGridRef.current.style.transform = 'translateX(0%)'
            setTimeout(() => {
                setSearchParams({})
                boxGridRef.current!.removeAttribute('style')

                // cleaning redux store
                resetChat()
            }, 550)
        }
    }

    useEffect(() => {
        checkIsExistsChat()
        window.addEventListener('resize', checkIsExistsChat)
        return () => window.removeEventListener('resize', checkIsExistsChat)
    }, [searchParams])

    useEffect(() => {
        handleMessage(socket, dispatch).listeningNewChatMessage(userData!._id);
        handleChat(socket, dispatch).receivingNewRequestedChat(userData!._id)
    }, [])

    useEffect(() => {
        socket.on('on write message', (chatID) => {
            setOnWriteMessageState((prev) => {
                return { ...prev, [chatID]: true }
            })
        })

        socket.on('on end write message', (chatID) => {
            setOnWriteMessageState((prev) => {
                return { ...prev, [chatID]: false }
            })
        })
    }, [])

    return (
        <BoxWrapper className="chat-screen">
            <Navbar />
            <Sidebar />
            <Container disableGutters maxWidth="xl" sx={{ height: '100%' }}>
                <BoxGrid ref={boxGridRef} sx={{ transform: { xs: isExistsChat ? 'translateX(-100%)' : 'translateX(0%)', md: 'translateX(0%) !important' } }}>
                    <BoxSidebar>
                        <ChatSidebar setSearchParams={setSearchParams} />
                    </BoxSidebar>
                    <BoxChatbox>
                        {isExistsChat ? <ChatBox onWriteMessageState={onWriteMessageState} handleClosingChat={handleClosingChat} searchParams={searchParams} /> : <h2>Select a chat</h2>}
                    </BoxChatbox>
                </BoxGrid>
            </Container>
        </BoxWrapper>
    )
}

export default Chat