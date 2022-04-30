import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostOptions from "./PostOptions";
import EditingPost from "./EditingPost";
import ImagePost from "./ImagePost";
import VideoPost from "./VideoPost";

interface IProps {
    _id: string,
    creator: {
        _id: string;
        username: string;
        name: string;
        picture: string;
    };
    content: null | string;
    media: { path: string , mimetype: string } | null;
    likes: string[];
    dislikes: string[];
    comments: number;
}

const Post = ({ _id, creator, content, media, likes, dislikes, comments }: IProps) => {
    const [openToggleOptions, setOpenToggleOptions] = useState(false)
    const [updatedContent, setUpdatedContent] = useState("")
    const [isPostEditing, setIsPostEditing] = useState(false)

    const togglePostOptions = () => {
        setOpenToggleOptions(prev => !prev)
    }

    useEffect(() => {
        setUpdatedContent(content ? content : "")
    }, [isPostEditing])

    return (
        <Card sx={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
            { openToggleOptions && <PostOptions postid={_id} creatorPostId={creator._id} setIsPostEditing={setIsPostEditing} /> }
            <PostHeader creator={creator} togglePostOptions={togglePostOptions} />
            {
               media && (
                    media.mimetype.includes('image') ? 
                        <ImagePost path={media.path} _id={_id} /> : 
                    media.mimetype.includes('video') &&
                        <VideoPost postId={_id} type={media.mimetype} src={media.path} />
               )
            }
            { isPostEditing ? 
                <EditingPost 
                    updatedContent={updatedContent}
                    _id={_id}
                    setIsPostEditing={setIsPostEditing}
                    setUpdatedContent={setUpdatedContent}
                /> 
            : content && <PostContent content={content} /> }
            <PostFooter likes={likes} dislikes={dislikes} postId={_id} comments={comments} />
        </Card>
    )
}

export default Post