import { CardMedia } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../../config";

interface IProps {
    path: string;
    _id: string;
}

const ImagePost = ({ path, _id }: IProps) => {

    const navigate = useNavigate();
    const location = useLocation();

    return <CardMedia
        sx={{ maxHeight: '700px', cursor: 'pointer' }}
        component="img"
        image={`${API_URL}/${path}`}
        alt="Post"
        onClick={() => {
            navigate(`/posts/${_id}`, {
                state: location
            })
        }}
    />;
};

export default ImagePost;
