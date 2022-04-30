import { Card, styled } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostFooter from "../components/Post/PostFooter";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import { getPostAction } from "../redux/actions/postAction";
import { RootState } from "../redux/store";
import CloseIcon from '@mui/icons-material/Close';
import API_URL from "../config";
import VideoPost from "../components/Post/VideoPost";

const Wrapper = styled('div')(({ theme }) => ({
    display: 'grid',
    position: 'relative',
}))

const CardStyled = styled(Card)(() => ({
    boxShadow: 'none',
    alignSelf: 'center',
}))


const MediaContainer = styled('div')(() => ({
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#333',
    height: '100vh',
    '& img, video': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block'
    }
}))

const IconClose = styled(CloseIcon)({
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    fontSize: '25px',
    background: '#fff',
    color: '#000',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
})

const PostScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { postId } = useParams();
    const { post } = useSelector((state: RootState) => state.post);
    const to = location.state ? (location as any).state?.pathname : '/';

    useEffect(() => {
        if (typeof postId === "string") {
            dispatch(getPostAction(postId))
        }
    }, [postId])

    return (
        <Wrapper>
            {
                post && (
                    <>
                        <CardStyled>
                            <PostHeader creator={post.creator} hideAction />
                            {
                                post?.content && <PostContent content={post.content} />
                            }
                            <PostFooter likes={post.likes} dislikes={post.dislikes} postId={post._id} />
                        </CardStyled>
                        
                            <MediaContainer>
                                {
                                    post?.media && (
                                        post.media.mimetype.includes("image") ? 
                                            <img src={`${API_URL}/${post.media.path}`} alt="Post" /> 
                                        : post?.media?.mimetype?.includes("video") &&
                                            <VideoPost src={post.media.path} type={post.media.mimetype} />
                                    )
                                }
                                
                            </MediaContainer>
                        
                        <IconClose 
                            onClick={() => {
                                navigate(to, { replace: true })
                            }}
                        />
                    </>
                )
            }
        </Wrapper>
    )
}

export default PostScreen
