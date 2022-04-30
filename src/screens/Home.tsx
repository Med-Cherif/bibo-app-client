import { useEffect } from 'react'
import { styled } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import PostsContainer from '../components/Post/PostsContainer'
import { getPublicPostsAction } from '../redux/actions/postAction'
import { RootState } from '../redux/store'

const Home = () => {
    const { publicPosts } = useSelector((state: RootState) => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPublicPostsAction())
    }, [])

    return (
        <div className='home-screen'>
            <PostsContainer posts={publicPosts} />
        </div>
    )
}

export default Home
