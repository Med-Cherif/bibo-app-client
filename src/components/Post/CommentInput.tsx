import { useState } from "react";
import { Box, styled, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useGlobalState } from "../../context/AppContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const BoxStyled = styled(Box)({
    position: 'sticky',
    background: '#fff',
    bottom: 0,
    left: 0,
    width: '100%',
})

interface IProps {
    postId: string;
}

const CommentInput = ({ postId }: IProps) => {

    const [comment, setComment] = useState("");
    const { userData } = useSelector((state: RootState) => state.auth)
    const { socket } = useGlobalState();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }

    const handleClick = () => {
        if (postId && userData?._id && comment.length > 0) {
            socket.emit('make comment', {
                postId, 
                userId: userData._id, 
                content: comment
            })
            setComment("")
        }
    }

    return (
        <BoxStyled>
            <OutlinedInput 
                sx={{ width: '100%' }}
                placeholder="comment here..."
                onChange={handleChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleClick}>
                            <AddCommentIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </BoxStyled>
    )
}

export default CommentInput