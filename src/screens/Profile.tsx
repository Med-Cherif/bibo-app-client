import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileBody from "../components/Post/ProfileBody";
import Contact from "../components/Profile/Contact";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { getUserData } from "../redux/actions/userAction";

const Profile = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const [userContact, setUserContact] = useState<
        {
            open: boolean;
            state: "followings" | "followers" | null
        }
    >({
        open: false,
        state: null
    })

    useEffect(() => {
        if (userId) {
            dispatch(getUserData(userId))
        }
    }, [userId])

    return (
        <div id="profile-screen">
            <ProfileHeader setUserContact={setUserContact} />
            <ProfileBody /> 
            <Contact _id={userId} userContact={userContact} setUserContact={setUserContact} />
        </div>
    )
}

export default Profile
