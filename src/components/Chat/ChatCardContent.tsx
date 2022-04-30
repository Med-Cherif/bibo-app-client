import { CardContent, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Message from "./Message";

const CardContentStyled = styled(CardContent)({
    flex: 1,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        width: '10px'
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    }
})

const MessagesBox = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

})

const MessageItem = styled('div')(({theme}) => ({
    padding: '6px',
    maxWidth: '48%',
    background: theme.palette.secondary.main,
    color: '#fff',
    borderRadius: '4px'
}))



interface IProps {
    messagesContainerRef: React.RefObject<HTMLDivElement>,
    onWriteMessageState: { [chatID: string]: boolean }
}

const ChatCardContent = ({ messagesContainerRef, onWriteMessageState }: IProps) => {
    const { chat } = useSelector((state: RootState) => state.chat)

    return (
        <CardContentStyled ref={messagesContainerRef}>
            <MessagesBox>
                {
                    chat?.messages && (
                        chat?.messages?.map((message: any, i: number) => {
                            return <Message key={message._id} message={message} chat={chat} index={i} />
                        })
                    )
                }
                {
                    onWriteMessageState[chat?._id] && (
                        <MessageItem
                            sx={{
                                alignSelf: 'flex-start',
                                bgcolor: '#ccc'
                            }}
                        >
                            <div className="skelton">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </MessageItem>
                    )
                }
            </MessagesBox>
        </CardContentStyled>
    )
}

export default ChatCardContent
