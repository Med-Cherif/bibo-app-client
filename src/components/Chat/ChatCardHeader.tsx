import { CardHeader, IconButton, Avatar } from "@mui/material"
import CallIcon from "@mui/icons-material/Call"
import VideoCallIcon from "@mui/icons-material/VideoCall"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store";
import {actions as chatActions} from "../../redux/slices/chatSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom"
import { useCallState } from "../../context/CallContext"

interface IProps {
    handleClosingChat: (cb: () => void) => void;
};

const ChatCardHeader = ({ handleClosingChat }: IProps) => {
    const { makeCall } = useCallState()
    const dispatch = useDispatch()
    const { chat } = useSelector((state: RootState) => state.chat)
    const navigate = useNavigate()

    const resetChat = () => {
        dispatch(chatActions.resetChat())
    }


    const callVideo = () => {
        const userID = chat?.user?._id
        if (userID) {
            makeCall(userID, 'video');
        }
    }

    const callVoice = () => {
        const userID = chat?.user?._id
        if (userID) {
            makeCall(userID, 'audio');
        }
    }

    return (
        <CardHeader
            avatar={
                <Avatar 
                    sx={{
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/profile/${chat?.user?._id}`)} 
                    src={`http://localhost:5000${chat?.user?.picture}`} 
                />
            }
            action={
                <>
                    <IconButton onClick={() => handleClosingChat(resetChat)} sx={{ display: { xs: 'inline-flex', md: 'none' } }} aria-label="back">
                        <ArrowBackIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={callVoice} aria-label="voice-call">
                        <CallIcon color='primary' />
                    </IconButton>
                    <IconButton onClick={callVideo} aria-label="video-call">
                        <VideoCallIcon color='primary' />
                    </IconButton>
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                </>
            }
            title={chat?.user?.username}
            subheader={chat?.user?.name}
        />  
    )
}

export default ChatCardHeader
