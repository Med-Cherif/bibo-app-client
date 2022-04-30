import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import NotificationAvatarText from "./NotificationAvatarText";

interface IProps {
    user2: {
        _id: string;
        picture: string;
    };
    message: string;
}

const FolowingNotification = ({ user2, message }: IProps) => {

    const navigate = useNavigate()
    const navigateToUserProfile = () => {
        navigate(`/profile/${user2._id}`)
    }
    return (
        <ListItem sx={{ height: '65px' }}>
            <NotificationAvatarText user2={user2} message={message} />
        </ListItem>
  )
}

export default FolowingNotification