import { ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../../context/AppContext"
import API_URL from "../../config";

interface IProps {
    _id: string;
    username: string;
    name: string;
    picture: string
}

const UserItem = ({ _id, username, name, picture }: IProps) => {
    const navigate = useNavigate()
    const { closeSearchBox } = useGlobalState()
    const goTo = () => {
        closeSearchBox()
        navigate(`/profile/${_id}`)
    }
    return (
        <ListItem disablePadding onClick={goTo}>
            <ListItemButton sx={{ padding: 0, paddingLeft: '15px' }}>
                <ListItemAvatar>
                    <Avatar
                        src={`${API_URL}/${picture}`} 
                        alt={username}
                    />
                </ListItemAvatar>
                <ListItemText primary={username} secondary={name} />
            </ListItemButton> 
        </ListItem>
    )
}

export default UserItem
