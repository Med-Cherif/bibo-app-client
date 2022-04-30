import { createPortal } from 'react-dom';
import { styled, Paper, Backdrop, Typography, Stack, IconButton } from '@mui/material';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalState } from '../../context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getCommentsAction } from '../../redux/actions/postAction';
import { actions as postActions } from "../../redux/slices/postSlice";

const PaperStyled = styled(Paper)(({
    width: '100%',
    position: 'relative',
    maxWidth: '600px',
    padding: '20px 0 0',
    maxHeight: 'calc(100vh - 20px)',
    overflow: 'auto',
}));

const Comments = () => {

    const { hideComments, commentsVisible, socket, commentPostID } = useGlobalState();
    const { comments } = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch()

    useEffect(() => {
        if (commentsVisible && commentPostID.current) {
            dispatch(getCommentsAction(commentPostID.current))
        }
    }, [commentsVisible])

    useEffect(() => {
        
        socket.on('make comment', (comment) => {
            if (comment.post === commentPostID.current) {
                dispatch(postActions.addComment(comment));
            }
        })
        
    }, [])

    return createPortal(
        <Backdrop
            open={commentsVisible}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                display: 'grid', 
                gridTemplateColumns: '1fr',
                justifyItems: 'center',    
            }}
        >
            <PaperStyled>
                <Typography align="center" variant="h4" gutterBottom sx={{ textTransform: 'capitalize' }}>Comments</Typography>
                <Stack spacing={1} sx={{ padding: '0 24px' }}>
                    {comments.map((comment) => (
                        <CommentItem key={comment._id} {...comment} />
                    ))}
                </Stack>
                <CommentInput postId={commentPostID.current || "" as string} />
                <IconButton sx={{ position: 'absolute', top: '1rem', right: '1rem' }} onClick={hideComments}>
                    <CloseIcon />
                </IconButton>
            </PaperStyled>
        </Backdrop>,
        document.getElementById('comments') as HTMLDivElement
    )
}

export default Comments