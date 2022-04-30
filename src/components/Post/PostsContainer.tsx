import { styled } from "@mui/material"
import { useState } from "react"
import Comments from "./Comments"
import Post from "./Post"

interface IProps {
    posts: any[]
}

const PostsContainerBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '50px', 
    alignItems: 'center',
    paddingBottom: '20px',
}))

const PostsContainer = ({ posts }: IProps) => {

    const [postsType, setPostsType] = useState<"random" | "followings">("followings");

    return (
        <PostsContainerBox>
            {posts.map((post) => {
                return <Post key={post._id} {...post} />
            })} 
            <Comments />
        </PostsContainerBox>
    )
}

export default PostsContainer
