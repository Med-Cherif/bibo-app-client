import React, { useRef, useState } from "react";
import { Typography, Button, styled, Grid, Container, Alert, Avatar } from "@mui/material";
import SettingField from "../components/Setting/SettingField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { changeProfilePictureAction, updateUserPasswordAction } from "../redux/actions/userAction";

const ContainerStyled = styled(Container)(() => ({
    background: '#ccc',
    marginTop: '20px',
    paddingBottom: '16px'
}))

const GridContainer = styled(Grid)(() => ({
    
}))

const ProfileImageSettingContainer = styled('div')({
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    border: '1px solid #eee',
    margin: '20px auto',
    position: 'relative',
    '& .MuiAvatar-circular.css-o7hfy6-MuiAvatar-root': {
        position: "absolute",
        top: '0', left: '0', width: '100%', height: '100%'
    }
})

const AvatarBox = styled('div')({
    cursor: 'pointer'
})

// currentPassword, newPassword, newConfirmingPassword

const server = process.env.REACT_APP_API_URL!;

const SettingsScreen = () => {

    const { userData } = useSelector((state: RootState) => state.auth)
    const { error } = useSelector((state: RootState) => state.user)
    const [isPasswordEditing, setIsPasswordEditing] = useState(false)
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const [updatePasswordData, setUpdatePasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        newConfirmingPassword: ""
    })

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatePasswordData((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const changeProfilePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const formData = new FormData()
            formData.append('profile-picture', file)
            dispatch(changeProfilePictureAction(formData))
        }
    }

    const handleChangeProfilePicture = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }


    return (
        <div>
            <Typography variant="h2" textAlign="center">Edit Profile</Typography>
            <ContainerStyled maxWidth="lg">
                <ProfileImageSettingContainer onClick={handleChangeProfilePicture}>
                    <input 
                        ref={inputRef} 
                        type="file" 
                        onChange={changeProfilePicture} 
                        style={{ display: 'none' }} 
                        accept="image/*"
                    />
                    <AvatarBox>
                        <Avatar src={`${server}/${userData!.picture}`} />
                    </AvatarBox>
                </ProfileImageSettingContainer>
                <GridContainer mb={2} container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <SettingField label="Username" value={userData!.username} name="username" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SettingField label="E-mail" value={userData!.email} name="email" />
                    </Grid>
                </GridContainer>
                <GridContainer mb={2} container spacing={2}>
                    <Grid item xs={12}>
                        <SettingField label="Name" value={userData!.name} name="name" />
                    </Grid>
                </GridContainer>
                <GridContainer mb={2} container spacing={2}>
                    <Grid item xs={12}>
                        <SettingField label="Bio" value={userData?.description || "No Bio"} name="description" textArea />
                    </Grid>
                </GridContainer>
                <Typography mb={2} variant="h5" textAlign="center">Edit your password</Typography>
                <GridContainer container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <SettingField handleChangePassword={handleChangePassword} isPasswordEditing={isPasswordEditing} isPasswordField label="Current password" value="" name="currentPassword" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SettingField handleChangePassword={handleChangePassword} isPasswordEditing={isPasswordEditing} isPasswordField label="New password" value="" name="newPassword" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SettingField handleChangePassword={handleChangePassword} isPasswordEditing={isPasswordEditing} isPasswordField label="Confirm new password" value="" name="newConfirmingPassword" />
                    </Grid>
                </GridContainer>
                {
                    error && <Alert sx={{ marginTop: '16px' }} variant="filled" severity="error">{error}</Alert>
                }
                {
                    !isPasswordEditing ?
                        <Button 
                            sx={{ margin: '16px 0' }} 
                            variant='outlined' 
                            color="primary"
                            onClick={() => setIsPasswordEditing(true)}
                        >
                            Edit password
                        </Button> : 
                        <Button 
                            sx={{ margin: '16px 0' }} 
                            variant='outlined' 
                            color="secondary"
                            onClick={() => {
                                function cb() {
                                    setIsPasswordEditing(false)
                                }
                                dispatch(updateUserPasswordAction(updatePasswordData, cb))
                            }}
                        >
                            Save
                        </Button>
                }
            </ContainerStyled>
        </div>
    )
}

export default SettingsScreen
