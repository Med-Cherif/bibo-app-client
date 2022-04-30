import { List, styled, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import ReportIcon from '@mui/icons-material/Report';
import { deletePostAction } from "../../redux/actions/postAction";
import { useNavigate, useParams } from "react-router-dom";

const ListContainer = styled(List)(() => ({
    position: 'absolute',
    width: '150px',
    padding: '0',
    background: '#fff',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .4)',
    top: '2.2rem',
    right: '2.2rem',
    zIndex: 1,
}))

interface IProps {
    creatorPostId: string;
    postid: string;
    setIsPostEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const PostOptions = ({ creatorPostId, postid, setIsPostEditing }: IProps) => {
    const { userData } = useSelector((state: RootState) => state.auth)
    const userId = userData!._id;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { postId } = useParams()


    const deletePost = () => {
        let isInPostScreen = false;
        if (postId && (postId === postid)) {
            isInPostScreen = true
        }
        dispatch(deletePostAction(postid, isInPostScreen, navigate))
    }

    const editPost = () => {
        setIsPostEditing(true)
    }

    const RenderedList = (
        userId === creatorPostId ? (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={deletePost}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={editPost}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit" />
                    </ListItemButton>
                </ListItem>
            </>
        ) : (
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ReportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Report" />
                </ListItemButton>
            </ListItem>
        )
    )

    return (
        <ListContainer>
            {RenderedList}
        </ListContainer>
    )
}

export default PostOptions
