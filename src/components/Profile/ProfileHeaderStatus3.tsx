import { StyledButton } from "./ProfileHeaderStatus";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalState } from "../../context/AppContext";
import { followUser } from "../../redux/actions/userAction";
import { RootState } from "../../redux/store";

const ProfileHeaderStatus3 = ({ chatUser }: { chatUser: () => void }) => {
    const { userData } = useSelector((state: RootState) => state.auth)
    const { userProfileData } = useSelector((state: RootState) => state.user)
    const {socket} = useGlobalState()
    const dispatch = useDispatch()

    const follow = () => {
        if (userData && userProfileData) {
            followUser(socket, dispatch).emitting({ followerId: userData._id, userId: userProfileData._id })
        }
    }

    return (
        <>
            <StyledButton onClick={follow} disableRipple disableElevation color="primary" variant="contained">Follow back</StyledButton>
            <StyledButton onClick={chatUser} disableRipple disableElevation color="secondary" variant="contained">Message</StyledButton>   
        </>
    )
}

export default ProfileHeaderStatus3
