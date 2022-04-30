import { StyledButton } from "./ProfileHeaderStatus"
import { useSelector } from "react-redux";
import { useGlobalState } from "../../context/AppContext";
import { unfollowUser } from "../../redux/actions/userAction";
import { RootState } from "../../redux/store";

const ProfileHeaderStatus2 = ({ chatUser }: { chatUser: () => void }) => {
    const { userData } = useSelector((state: RootState) => state.auth)
    const { userProfileData } = useSelector((state: RootState) => state.user)
    const { socket } = useGlobalState()

    const unfollow = () => {
        if (userData && userProfileData) {
            unfollowUser(socket).emitting({ unfollowerId: userData._id, userId: userProfileData._id })
        }
    }
    return (
        <>
            <StyledButton onClick={unfollow} disableRipple disableElevation color="primary" variant="contained">Unfollow</StyledButton>
            <StyledButton onClick={chatUser} disableRipple disableElevation color="secondary" variant="contained">Message</StyledButton>   
        </>
    )
}

export default ProfileHeaderStatus2
