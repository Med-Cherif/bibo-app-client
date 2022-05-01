import { Box, styled, List, ListItemAvatar, ListItemButton, ListItem, Typography, Avatar, ListItemText } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { getChatsAction } from "../../redux/actions/chatAction"
import API_URL from "../../config"

const BoxStyled = styled(Box)({
    overflow: 'auto',
    height: 'calc(100vh - 155px)',
    '&::-webkit-scrollbar': {
        width: '10px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    }, 
    '&::-webkit-scrollbar-thumb' : {
        background: '#888',
    },
    '&::-webkit-scrollbar-thumb:hover' : {
        background: '#555',
    },
})

const ChatSidebarBody = ({ setSearchParams, chats }: any) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getChatsAction())
    }, [])

    return (
        <BoxStyled>
            <Box>
                <Typography gutterBottom variant="subtitle1" align="center" component="h2" sx={{ marginTop: '20px' }}>Chats</Typography>
                <List>
                    {
                        chats.length > 0 && (
                            chats.map((chat: any) => {                                
                                return <ListItem disablePadding key={chat._id}>
                                    <ListItemButton disableRipple onClick={() => {
                                        setSearchParams({ user: chat.user._id })
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar src={`${API_URL}${chat.user.picture}`} alt={chat.user.username} />
                                        </ListItemAvatar>
                                        <ListItemText 
                                            primary={chat.user.username}
                                            secondary={chat.lastMessage.content}
                                        />

                                    </ListItemButton> 
                                </ListItem>
                            })
                        )
                    }
                </List>
            </Box>
        </BoxStyled>
    )
}

export default ChatSidebarBody
