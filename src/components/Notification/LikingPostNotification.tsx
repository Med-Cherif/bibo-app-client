import { ListItem, styled } from "@mui/material";
import API_URL from "../../config";
import NotificationAvatarText from "./NotificationAvatarText";

interface IProps {
    post: {
        _id: string,
        media: {
            mimetype: string;
            path: string
        } | null
    };
    user2: {
        _id: string; picture: string
    };
    message: string
}

const VideoStyled = styled('video')({
    position: "absolute", 
    top: "0", 
    left: "0", 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover'
})

const ImageStyled = styled('img')({
    position: "absolute", 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover'
})

const MediaContainer = styled('div')({
    width: 60, 
    height: 60, 
    position: "relative",
    cursor: "pointer"
})


const LikingPostNotification = ({ post, user2, message }: IProps) => {
  return (
    <ListItem
        sx={{ height: '65px' }}
        secondaryAction={
            post?.media && (
                post.media.mimetype.includes("image") ? (
                    <MediaContainer>
                        <ImageStyled src={`${API_URL}/${post.media.path}`} alt="Post" />
                    </MediaContainer>
                ) : post.media.mimetype.includes("video") && (
                    <MediaContainer>
                        <VideoStyled>
                            <source src={`${API_URL}/${post.media.path}`} type={post.media.mimetype} />
                        </VideoStyled>
                    </MediaContainer>
                )
            )
        }
    >
        <NotificationAvatarText user2={user2} message={message} />
    </ListItem>
  )
}

export default LikingPostNotification