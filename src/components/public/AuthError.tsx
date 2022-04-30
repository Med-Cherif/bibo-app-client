import { Alert, Collapse, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const CustomAlert = styled(Alert)({
    padding: '0 16px',
    '& > first-child': {
        padding: '3px 0'
    },
    '& > nth-child(2)': {
        padding: '4px 0'
    },
})

const TopError = () => {
    const [isError, setIsError] = useState(true)
    const { error } = useSelector((state: RootState) => state.auth)

    const closeErrorBox = () => {
        setIsError(false)
    }

    useEffect(() => {
        if (error.message) {
            setIsError(true)
        }
    }, [error])


    const displayErrorByType = (): React.ReactNode => {
        if (typeof error.message === "string") {
            return <CustomAlert
                action={
                    <IconButton
                        color="error"
                        size="small"
                        onClick={closeErrorBox}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                severity="error" >
                {error.message}
            </CustomAlert>
        }
        if (Array.isArray(error.message)) {
            return (error.message as string[]).map((err, i) => (
                i === 0 ? <CustomAlert
                    action={
                        <IconButton
                            color="error"
                            size="small"
                            onClick={closeErrorBox}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity="error" >
                    {err}
                </CustomAlert> : <CustomAlert severity="error">{err}</CustomAlert>
            ))
        }
        return null;
    }

    return error.type === "auth-error" ? (
        <Collapse sx={{
            position: "fixed",
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: "100%",
            maxWidth: "850px",
            zIndex: 100,
        }} in={isError}>
           {displayErrorByType()}
        </Collapse>
    ) : null
}

export default TopError
