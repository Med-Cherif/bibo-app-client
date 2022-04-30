import { Typography, Stack, Avatar, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { calculateTime } from "../../utils/time"
import { Comment } from "../../redux/slices/postSlice";
import { useGlobalState } from '../../context/AppContext';
import { deleteCommentAction } from '../../redux/actions/postAction';

interface IProps extends Comment {
    
}

const CommentItem = ({ _id, content, createdAt, post, user }: IProps) => {

    const { userData } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()

    const isAbleToDelete = () => {
        if (userData && (userData._id === user._id || post.creator === userData._id)) return true;
        return false
    }

    const deleteComment = () => {
        dispatch(deleteCommentAction({
            commentID: _id,
            postID: post._id
        }))
    }

    return (
        <Stack spacing={1} direction="row">
            <Link to={`/profile/${user._id}`}>
                <Avatar alt={user.username} />
            </Link>
            <Box>
                <Stack>
                    <Typography style={{ fontWeight: '600' }} variant="subtitle1">
                        {user.username}
                        <Typography>{content}</Typography>
                    </Typography>
                    <Stack direction='row' alignItems="center" spacing={2}>
                        <Typography fontSize="14px">{calculateTime(createdAt)}</Typography>
                        {
                            isAbleToDelete() && <Button onClick={deleteComment} style={{ padding: 0 }} color="error">delete</Button>
                        }
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}

export default CommentItem