import { useState } from 'react';
import { Box, styled, List, ListItem, ListItemText, ListItemButton, ListItemIcon, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from '../../redux/actions/authAction';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGlobalState } from '../../context/AppContext';

const options = [
    { id: 2, icon: <SettingsIcon />, title: 'Settings', to: "/settings" },
]

const BoxStyled = styled(Box)(({ theme }) => ({
    width: '250px',
    position: 'fixed',
    zIndex: theme.zIndex.drawer,
    background: '#f9f9f9',
    transition: `${theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard,
    })}`,
    transform: 'translateX(-100%)',
    boxShadow: '2px 0 15px 0 rgb(0 0 0 / 15%)',
    [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 40px)'
    },
    '&.active': {
        transform: 'translateX(0)',
    },
    '&.active svg': {
        transform: 'rotate(-180deg)'
    }
}))

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(100%, -50%)',
    background: theme.palette.secondary.light,
    borderRadius: '0 50% 50% 0',
    '& svg': {
        color: theme.palette.primary.dark,
        transition: `${theme.transitions.create('transform', {
            duration: theme.transitions.duration.standard,
        })}`,
    },
}))

interface IProps {
    isFullHeight?: boolean | undefined
}

const Sidebar = ({ isFullHeight }: IProps) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { socket } = useGlobalState()

    const [isSidebarOpen, setIsSidebaropen] = useState(false)

    const toggleSidebar = () => setIsSidebaropen(prev => !prev)

    const logout = () => {
        dispatch(logoutAction(socket, navigate))
    }

    return (
        <BoxStyled sx={{
            top: isFullHeight ? 0 : '64px',
            height: isFullHeight ? '100vh' : 'calc(100vh - 64px)',
        }} className={`${isSidebarOpen ? 'active' : ''}`}>
            <List>
                {options.map((option) => (
                    <ListItem key={option.id} disablePadding>
                        <ListItemButton disableTouchRipple onClick={() => navigate(option.to)}>
                            <ListItemIcon>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText primary={option.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={logout} disableTouchRipple>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
            <IconButtonStyled onClick={toggleSidebar} disableTouchRipple disableFocusRipple disableRipple>
                <ArrowForwardIcon />
            </IconButtonStyled>
        </BoxStyled>
    )
}

export default Sidebar
