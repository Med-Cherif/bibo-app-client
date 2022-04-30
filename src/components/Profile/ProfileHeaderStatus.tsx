import { Button, Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/userAction";
import { RootState } from "../../redux/store";
import ProfileHeaderStatus1 from "./ProfileHeaderStatus1";
import ProfileHeaderStatus2 from "./ProfileHeaderStatus2";
import ProfileHeaderStatus3 from "./ProfileHeaderStatus3";
import ProfileHeaderStatus4 from "./ProfileHeaderStatus4";
import { useEffect } from "react";
import useGetFollowings from "../../hooks/useGetFollowings";

interface IProps {
    userIdParam: string
}

const BoxStyled = styled(Box)(({ theme }) => ({
    display: 'flex', 
    flexDirection: 'column',
    gap: '8px', 
    alignItems: 'flex-end', 
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
    }
}))

export const StyledButton = styled(Button)({
    width: '100px'
})

const ProfileHeaderStatus = ({ userIdParam }: IProps) => {
    const { myFollowings, userProfileData } = useSelector((state: RootState) => state.user);
    const { userData } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate()
    
    const chatUser = () => {
        navigate(`/messages?user=${userProfileData!._id}`)
    }

    useGetFollowings()
    
    return (
        <BoxStyled>
            {
                userProfileData ? (
                    <>
                        {userData!._id === userIdParam ? (
                            <ProfileHeaderStatus1 />
                        // if i am following him
                        ) : myFollowings.includes(userProfileData._id) ? (
                            <ProfileHeaderStatus2 chatUser={chatUser} />
                        ) : !myFollowings.includes(userProfileData._id) ? (
                        // if i am not following him
                            <ProfileHeaderStatus4 chatUser={chatUser} /> 
                        ) : null}
                    </>  
                ) : null
            }
        </BoxStyled>
    )
}

export default ProfileHeaderStatus
