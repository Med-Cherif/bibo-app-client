import { useNavigate } from "react-router-dom"
import { StyledButton } from "./ProfileHeaderStatus"

const ProfileHeaderStatus1 = () => {
    const navigate = useNavigate()
    const navigateToEditPage = () => {
        navigate(`/settings`)
    }
    return (
        <>
            <StyledButton onClick={navigateToEditPage} disableRipple disableElevation color="primary" variant="contained">Edit</StyledButton>   
        </>
    )
}

export default ProfileHeaderStatus1
