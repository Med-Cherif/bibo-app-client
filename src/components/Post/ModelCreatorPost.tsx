import { useState } from "react";
import { Backdrop, CardMedia, CardActions, Button, TextField, styled, Card, Paper, CardHeader, CardContent, Avatar } from '@mui/material'
import { useGlobalState } from "../../context/AppContext";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createPostAction } from "../../redux/actions/postAction";
import API_URL from "../../config"

const PaperStyled = styled(Paper)(({
    width: '100%',
    maxWidth: '600px',
}));

interface PostMedia {
    type: null | string,
    src: null | string,
    file: null | File
}

const ModelCreatorPost = () => {
    const [postMedia, setPostMedia] = useState<PostMedia>({
        type: null,
        src: null,
        file: null
    })
    const { isOpenPostCreator, closePostCreator } = useGlobalState()
    const { userData } = useSelector((state: RootState) => state.auth)
    const [postContent, setPostContent] = useState("")
    const dispatch = useDispatch()

    const resetPostMedia = () => {
        setPostMedia({
            type: null,
            src: null,
            file: null
        })
    }

    const closePostCreatorMouse = (e: any) => {
        if (e.target.classList.contains('backdrop-post-creator')) {
            closePostCreator(resetPostMedia)
        }
    }

    const handlePostImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (file.type.includes('video') || file.type.includes('image')) {
            const src = URL.createObjectURL(file);
            setPostMedia({
                type: file.type,
                src,
                file
            })
        }
    }

    const createPost = () => {
        let content = postContent ? postContent : null
        
        dispatch(createPostAction(content, postMedia.file, () => closePostCreator(resetPostMedia)))
    }
    

    return (
        <Backdrop
            className="backdrop-post-creator"
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                padding: 2, 
                display: 'grid', 
                gridTemplateColumns: '1fr',
                justifyItems: 'center',
                overflow: 'auto',
                
            }}
            open={isOpenPostCreator}
            onClick={closePostCreatorMouse}
        >
            <PaperStyled className="post-creator-box" elevation={0}>
                <Card sx={{ boxShadow: 'none' }}>
                    <CardHeader
                        avatar={
                            <Avatar alt="Mohamed cherif" src={`${API_URL}/${userData!.picture}`} />
                        }
                        title={userData!.username}
                        subheader={userData!.name}
                    />
                </Card>
                <CardContent>
                    <TextField 
                        sx={{
                            '& > .css-19kzu47-MuiInputBase-root-MuiFilledInput-root': {
                                padding: '8px 12px',
                            },
                            '& > .css-19kzu47-MuiInputBase-root-MuiFilledInput-root::before, .css-19kzu47-MuiInputBase-root-MuiFilledInput-root::after': {
                                display: 'none',
                            }
                        }}
                        minRows={3}
                        fullWidth={true}
                        multiline={true}
                        id="filled"
                        placeholder="Anything in your mind..."
                        variant="filled"
                        onChange={(e) => setPostContent(e.target.value)}
                        value={postContent}
                    />
                    <input 
                        style={{ display: 'none' }} 
                        type="file" 
                        name="post-image" 
                        id="post-image" 
                        onChange={handlePostImage}
                    />
                </CardContent>
                {
                    (postMedia.type && postMedia.src) ? (
                        postMedia.type.includes('image') ? (
                            <CardMedia
                                component="img"
                                image={postMedia.src}
                                alt="post"
                                sx={{ objectFit: 'contain' }}
                            />
                        ) : postMedia.type.includes("video") ? (
                            <>
                                <video style={{ width: '100%' }} controls>
                                    <source src={postMedia.src} type={postMedia.type} />
                                </video> 
                            </>
                        ) : null
                    ) : null
                }
                <CardActions>
                    <Button onClick={() => closePostCreator(resetPostMedia)} color="primary">Cancel</Button>
                    <Button onClick={createPost} color="primary">Share</Button>
                    <Button sx={{ marginLeft: 'auto !important' }} color="primary">
                        <label htmlFor="post-image">
                            <AddPhotoAlternateIcon 
                                sx={{
                                    color: 'primary.main', 
                                    cursor: 'pointer' 
                                }} 
                                fontSize="medium"
                            />
                        </label>
                    </Button>
                </CardActions>
            </PaperStyled>
        </Backdrop>
    )
}

export default ModelCreatorPost
