import { Avatar, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from 'react-router-dom';
import API_URL from "../../config"

interface IProps {
    creator: {
        username: string;
        picture: string;
        name: string,
        _id: string
    },
    hideAction?: boolean,
    togglePostOptions?: () => void
}

const PostHeader = ({ creator, hideAction, togglePostOptions }: IProps) => {
    const navigate = useNavigate()
    return (
        <CardHeader
            avatar={
                <Avatar sx={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${creator._id}`)} alt={creator.username} src={`${API_URL}/${creator.picture}`} />
            }
            action={
                !hideAction && <IconButton onClick={togglePostOptions!} aria-label="settings"><MoreVertIcon /></IconButton>
            }
            title={creator.username}
            subheader={creator.name}
        />
    )
}

export default PostHeader
