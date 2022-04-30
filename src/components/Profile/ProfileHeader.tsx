import { Box, Avatar, Typography, styled, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProfileHeaderStatus from "./ProfileHeaderStatus";
import { useParams } from "react-router-dom";
import API_URL from "../../config";

const BoxStyled = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    columnGap: 32,
    width: '100%',
    maxWidth: '1170px',
    margin: 'auto',
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
    }
}))

const FollowStatus = styled(Box)(({ theme }) => ({
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
}))

const BoxAvatarContainer = styled(Box)({
    position: 'relative',
    flexBasis: '150px',
})

const BoxInfoContainer = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
    }
}))

const GridItem = styled(Grid)(({ theme }) => ({
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
    }
}))

interface IProps {
    setUserContact: React.Dispatch<React.SetStateAction<{
        open: boolean;
        state: "followings" | "followers" | null
    }>>
}

const ProfileHeader = ({ setUserContact }: IProps) => {
    const { userProfileData } = useSelector((state: RootState) => state.user)
    const maxWidth = "900px"
    const { userId } = useParams()

    const getUserFollowings = () => {
        setUserContact({
            open: true,
            state: "followings"
        })
    }

    const getUserFollowers = () => {
        setUserContact({
            open: true,
            state: "followers"
        })
    }
    
    return (
        <BoxStyled>
            {
                userProfileData && Object.values(userProfileData).length > 0 && (
                    <>
                        <BoxAvatarContainer>
                            <Avatar 
                                sx={{ width: '150px', height: '150px' }} 
                                alt="profile" 
                                src={`${API_URL}/${userProfileData.picture}`} 
                            />
                        </BoxAvatarContainer>
                        <BoxInfoContainer>
                            <Grid container spacing={3} sx={{ maxWidth }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="h5" variant="h5">{userProfileData.username}</Typography>
                                    <Typography variant="body1">{userProfileData.name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ProfileHeaderStatus userIdParam={userId ? userId : ""} />
                                </Grid>
                            </Grid>

                            <Typography sx={{ color: '#333' }} variant="body2" my={3}>
                                {userProfileData.description}
                            </Typography>

                            <Grid container spacing={2} sx={{ maxWidth }}>
                                <GridItem item xs={6}>
                                    <FollowStatus onClick={getUserFollowings}>
                                        <Typography sx={{ fontWeight: '500', fontSize: '18px' }} variant="subtitle1">Followings</Typography>
                                        <Typography sx={{ fontWeight: '600' }} variant="subtitle2">{userProfileData.followings}</Typography>
                                    </FollowStatus>
                                </GridItem>
                                <GridItem item xs={6} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                                    <FollowStatus onClick={getUserFollowers} sx={{ marginLeft: 'auto' }}>
                                        <Typography sx={{ fontWeight: '500', fontSize: '18px' }} variant="subtitle1">Followers</Typography>
                                        <Typography sx={{ fontWeight: '600' }} variant="subtitle2">{userProfileData.followers}</Typography>
                                    </FollowStatus>
                                </GridItem>
                            </Grid>
                        </BoxInfoContainer>
                    </>
                )
            }
        </BoxStyled>
    )
}

export default ProfileHeader
