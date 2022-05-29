import { CardHeader, IconButton, Avatar } from "@mui/material"
import CallIcon from "@mui/icons-material/Call"
import VideoCallIcon from "@mui/icons-material/VideoCall"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store";
import {actions as chatActions} from "../../redux/slices/chatSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom"
import API_URL from "../../config"

interface IProps {
    handleClosingChat: (cb: () => void) => void;
};

const ChatCardHeader = ({ handleClosingChat }: IProps) => {
    const dispatch = useDispatch()
    const { chat } = useSelector((state: RootState) => state.chat)
    const navigate = useNavigate()

    const resetChat = () => {
        dispatch(chatActions.resetChat())
    }

    return (
        <CardHeader
            avatar={
                <Avatar 
                    sx={{
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/profile/${chat?.user?._id}`)} 
                    src={`${API_URL}/${chat?.user?.picture}`} 
                />
            }
            action={
                <>
                    <IconButton onClick={() => handleClosingChat(resetChat)} sx={{ display: { xs: 'inline-flex', md: 'none' } }} aria-label="back">
                        <ArrowBackIcon color="primary" />
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
