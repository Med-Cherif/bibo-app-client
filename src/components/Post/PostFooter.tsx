import { CardActions, Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { useSelector, useDispatch } from "react-redux";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { RootState } from "../../redux/store";
import { likeAndUnlikePostAction, dislikeAndUndislikePostAction } from "../../redux/actions/postAction";
import { useGlobalState } from "../../context/AppContext";

interface IProps {
    likes: string[],
    dislikes: string[],
    postId: string,
    comments?: number
}

const PostFooter = ({ likes, dislikes, postId, comments }: IProps) => {
    const { userData } = useSelector((state: RootState) => state.auth)
    const { socket, showComments } =  useGlobalState()
    const dispatch = useDispatch()

    const likePost = () => {
        dispatch(likeAndUnlikePostAction(postId, socket))
    }
    const dislikePost = () => {
        dispatch(dislikeAndUndislikePostAction(postId))
    }

    const displayCommentsLength = () => {
        let value = comments;
        if (!value) {
            value = 0
        }
        if (value === 0) return 'no comments';
        if (value === 1) return 'one comment';
        if (value > 1) return `${comments} commnets`
    }

    return (
        <CardActions>
            <Box>
                <IconButton aria-label="like a post" onClick={likePost}>
                    { likes.includes(userData!._id) ? <FavoriteIcon color="secondary" /> : <FavoriteIcon /> }
                </IconButton>
                {likes.length === 1 ? '1 like' : likes.length + ' likes'}
            </Box>
            <Box>
                <IconButton aria-label="dislike a post" onClick={dislikePost}>
                    { dislikes.includes(userData!._id) ? <HeartBrokenIcon color="secondary" /> : <HeartBrokenIcon /> }
                </IconButton>
                {dislikes.length === 1 ? '1 dislike' : dislikes.length + ' dislikes'}
            </Box>
            <Box style={{ marginLeft: 'auto' }}>
                <IconButton onClick={() => showComments(postId)}>
                    <ModeCommentIcon />
                </IconButton>
                {displayCommentsLength()}
            </Box>
        </CardActions>
    )
}

export default PostFooter
