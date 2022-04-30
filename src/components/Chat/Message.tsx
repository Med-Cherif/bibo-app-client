import { styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const MessageItem = styled('div')(({theme}) => ({
    padding: '6px',
    maxWidth: '48%',
    background: theme.palette.secondary.main,
    color: '#fff',
    borderRadius: '4px'
}))

const Seen = styled('span')({
  textAlign: 'end',
  fontSize: "17px",
  fontWeight: 600,
  letterSpacing: "1px",
  textTransform: "capitalize",
  color: "#555",
})

interface IProps {
  message: any;
  chat: any;
  index: number;
}

type DateFormat = `${number}-${number}-${number}`;

function getDateFormat(date: Date): DateFormat {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function getTimeFormat(date: Date) {
    let hours: string | number = date.getHours() as number;
    let minutes: string | number = date.getMinutes() as number;
    if (hours < 10) {
        hours = `0${hours}` as string;
    }
    if (minutes < 10) {
        minutes = `0${minutes}` as string;
    }

    return `${hours}:${minutes}`;
     
}

const Message = ({ message, chat, index }: IProps) => {
    const { userData } = useSelector((state: RootState) => state.auth);
    const myID = userData!._id;
    const currentDate = getDateFormat(new Date(message.createdAt));
    const messageTime = getTimeFormat(new Date(message.createdAt));

    function isDifferentDate(): boolean {
        let prevDate;
        if (chat.messages[index - 1]) {
            prevDate = getDateFormat(new Date(chat.messages[index - 1].createdAt));
        }

        if (prevDate !== currentDate) {
            return true;
        }
        return false
    }
    
    return <>
        {
            isDifferentDate() && <Typography align="center" variant="h6">{currentDate}</Typography>
        }
        
        <MessageItem sx={{
            alignSelf: message.sender !== chat.user._id ? 'flex-end' : 'flex-start',
            bgcolor: message.sender !== chat.user._id ? 'primary.main' : 'secondary.main',
        }}>
            <Typography sx={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }} variant="body1" paragraph>
                {message.content}
                <Typography sx={{ alignSelf: 'end', textAlign: 'end' }} variant="body2" component="span">{messageTime}</Typography>
            </Typography>
        </MessageItem>
        { (index === chat.messages.length - 1 && message.sender === myID && message?.seen === true) && <Seen>seen</Seen> }
    </>
  
}

export default Message