import { IconButton, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useGlobalState } from "../../context/AppContext";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    zIndex: 1111,
    background: theme.palette.secondary.light,
    '& svg': {
        color: theme.palette.primary.dark,
    }
}))

const Plus = () => {
    const { openPostCreator } = useGlobalState()
    return (
        <IconButtonStyled disableRipple onClick={openPostCreator}>
            <AddIcon fontSize="large" />
        </IconButtonStyled>
    )
}

export default Plus
