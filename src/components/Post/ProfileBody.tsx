import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import PostsContainer from "./PostsContainer"

const ProfileBody = () => {

    const { userPosts } = useSelector((state: RootState) => state.post)

    return (
        <div>
            <PostsContainer posts={userPosts} />
        </div>
    )
}

export default ProfileBody
