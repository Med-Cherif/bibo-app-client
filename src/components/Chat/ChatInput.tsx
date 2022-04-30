import { useState, useRef, useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useGlobalState } from "../../context/AppContext";
import { CardActions, Box, styled, InputBase } from '@mui/material';
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from '@mui/icons-material/Send';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { handleMessage } from "../../redux/actions/chatAction";

const InputContainer = styled('div')({
    height: '35px',
    width: '100%',
    lineHeight: '35px'
})

const ChatInput = () => {

    const [isEmojiBoxVisible, setIsEmojiBoxVisible] = useState(false)
    const [message, setMessage] = useState("")

    const { chat } = useSelector((state: RootState) => state.chat)
    const { userData } = useSelector((state: RootState) => state.auth)
    const { socket } = useGlobalState()

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

    const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
        setMessage(prevMes => `${prevMes}${emojiObject.emoji}`)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    };

    const writeMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        handleMessage(socket).emitting({ senderId: userData!._id, toId: chat?.user?._id, content: message, chatId: chat?._id })
        setMessage('')
    }

    const sendMessageWithEnter = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key.toLowerCase() === 'ENTER'.toLowerCase()) {
            sendMessage()
        }
    }

    useEffect(() => {
        const chatID = chat?._id;
        if (!chatID) return;

        const data = {
            userID: chat.user._id,
            chatID
        }

        if (message.length > 0) {
            socket.emit('on write message', data)
        } else {
            socket.emit('on end write message', data)
        }
    }, [message])

    // const x = [on end write message, on write message]

    return <CardActions sx={{ padding: '8px 16px', border: '1px solid #ccc' }}>
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <InsertEmoticonIcon color="primary" sx={{ cursor: 'pointer' }} onClick={() => setIsEmojiBoxVisible(prev => !prev)} />
            { isEmojiBoxVisible && <Picker pickerStyle={{ position: 'absolute', top: '-12px', transform: 'translateY(-100%)', left: '0px' }} disableSearchBar disableSkinTonePicker onEmojiClick={onEmojiClick} /> }
        </Box>
        <InputContainer sx={{ position:'relative' }}>
            <InputBase
                sx={{ width: '100%', paddingRight: '32px' }}
                inputRef={inputRef}
                placeholder="Message..."
                value={message}
                onChange={writeMessage}
                onKeyDown={sendMessageWithEnter}
            />
            <SendIcon onClick={sendMessage} color="primary" sx={{
                position: 'absolute', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', right: '0'
            }} />
        </InputContainer>
    </CardActions>
};

export default ChatInput;
