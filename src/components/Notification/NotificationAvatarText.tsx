import { useNavigate } from "react-router-dom";
import { ListItemAvatar, ListItemText, Avatar } from "@mui/material"
import API_URL from "../../config";

interface IProps {
    message: string;
    user2: {
        _id: string;
        picture: string;
    }
}

const NotificationAvatarText = ({ message, user2 }: IProps) => {

    const navigate = useNavigate()

    const navigateToUserProfile = () => {
        navigate(`/profile/${user2._id}`)
    }

    return (
        <>
            <ListItemAvatar sx={{ cursor: 'pointer' }} onClick={navigateToUserProfile}>
                <Avatar src={`${API_URL}/${user2.picture}`} alt="User" />
            </ListItemAvatar>
            <ListItemText primary={message} />
        </>
    )
}

export default NotificationAvatarText