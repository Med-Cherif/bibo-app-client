import { useNavigate } from 'react-router-dom';
import {
    ListItemButton, 
    ListItemAvatar, 
    Avatar, 
    ListItem, 
    ListItemText,
} from "@mui/material"
import ContactAction from './ContactAction';
import API_URL from "../../config";

interface IProps {
    _id: string,
    picture: string,
    username: string,
    name: string,
    followers: string[],
    closeUserContact: () => void,
}

const ContactItem = ({ _id, name, username, picture, followers, closeUserContact }: IProps) => {
    const navigate = useNavigate()
    const navigateToProfileScreen = () => {
        closeUserContact();
        navigate(`/profile/${_id}`);
    }

    
    return (
        <ListItem 
            disablePadding
            secondaryAction={
                <ContactAction _id={_id} /> 
            }
        >
            <ListItemButton sx={{ padding: '0 12px' }} onClick={navigateToProfileScreen}>
                <ListItemAvatar>
                    <Avatar 
                        alt="User"
                        src={`${API_URL}/${picture}`}
                    />
                </ListItemAvatar>
                <ListItemText primary={username} secondary={name} />
            </ListItemButton>
        </ListItem>
  )
}

export default ContactItem