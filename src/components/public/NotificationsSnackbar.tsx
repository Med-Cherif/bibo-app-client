import { useState } from 'react'
import { Snackbar, IconButton, SnackbarContent, Typography } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"
import { useGlobalState } from '../../context/AppContext'

const NotificationsSnackbar = () => {

    const { notificationSnackbar: { open, message }, setNotificationSnackbar } = useGlobalState()

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setNotificationSnackbar({
            message: "",
            open: false
        })
    }

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    )

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            action={action}
            onClose={handleClose}
            color="primary"
            message={
                <>
                    <Typography component="span" variant="body1">{message}</Typography>
                </>
            }
        />
    )
}

export default NotificationsSnackbar