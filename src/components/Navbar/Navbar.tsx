import { Toolbar, Box, Typography, AppBar, Container, Avatar, Badge, styled } from '@mui/material'
import { Link, useLocation, useNavigate } from "react-router-dom"
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchBox from './SearchBox';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import API_URL from "../../config";

const LinkStyled = styled(Link)({
    color: '#fff',
    display: 'flex'
})

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    justifyContent: "space-between",
    gap: '20px',
    height: '64px',
}))

const Navbar = ({ hideNotificationBar, hideSearchbar }: { hideNotificationBar?: boolean, hideSearchbar?: boolean }) => {

    const { userData } = useSelector((state: RootState) => state.auth)
    const location = useLocation()
    const navigate = useNavigate()

    const handleClickingTitle = () => {
        if (location.pathname === '/' && window.scrollY > 0) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        } else {
            navigate('/')
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ boxShadow: "none" }}>
                <Container disableGutters maxWidth="xl">
                    <ToolbarStyled>
                    <Typography onClick={handleClickingTitle} sx={{ cursor: 'pointer' }} variant="h4" component="div">Bibo</Typography>
                    { hideSearchbar ? null : <SearchBox /> }
                    <Box sx={{
                        display: 'flex', gap: { xs: '10px', sm: '20px' }, alignItems: 'center',
                    }}>
                        <LinkStyled sx={{ display: { xs: 'flex', sm: 'none' } }} to="/search">
                            <SearchIcon />
                        </LinkStyled>
                        <LinkStyled to="/messages">
                            <Badge badgeContent={0} color="secondary">
                                <MailIcon />
                            </Badge>
                        </LinkStyled>
                        {hideNotificationBar ? null : <LinkStyled to="/notifications"><Badge badgeContent={0} color="secondary"><NotificationsIcon /></Badge></LinkStyled>}
                        
                        <Link to={`/profile/${userData?._id}`}>
                            <Avatar
                                alt="Profile"
                                src={`${API_URL}/${userData!.picture}`}
                            />
                        </Link>
                    </Box>
                    </ToolbarStyled>
                </Container>
            </AppBar>
        </Box>
      );
}

export default Navbar
