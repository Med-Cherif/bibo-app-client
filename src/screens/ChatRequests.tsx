import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemAvatar, Avatar, ListItemButton, Box, styled, Container, ListSubheader, ListItemText, Typography, IconButton, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getRequestedChatsAction } from "../redux/actions/chatAction";
import { handleChat } from "../redux/actions/chatAction";
import { useGlobalState } from "../context/AppContext";
import moment from "moment";
import { calculateTime } from "../utils/time";

const DeleteAllButton = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
})


const server = process.env.REACT_APP_API_URL!;

const ChatRequests = () => {

    const { requestedChats } = useSelector((state: RootState) => state.chat);
    const { userData } = useSelector((state: RootState) => state.auth);
    const { socket } = useGlobalState()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getRequestedChatsAction())
    }, [])

    useEffect(() => {
        handleChat(socket, dispatch).receivingNewRequestedChat(userData!._id);
    }, [])

    return <Box>
        <Container maxWidth="lg">
            <List
                subheader={
                    <ListSubheader>
                        Messages Requests
                    </ListSubheader>
                }
            >
            {requestedChats.map((chat: any) => {
                
                '2022-01-29T10:10:13'
                
                const createdAt = calculateTime(chat.lastMessage.createdAt);
                return <ListItem 
                    onClick={() => navigate(`/messages?user=${chat.user._id}`)}
                    key={chat._id}
                    secondaryAction={
                        <IconButton>
                            <DeleteIcon color="secondary" fontSize="large" />
                        </IconButton>
                    }
                    disablePadding
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar
                                src={`${server}/${chat.user.picture}`}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={chat.user.username} secondary={
                            <Typography variant="body2" component="div">
                                {chat?.lastMessage?.content} <Typography sx={{ margin: '0 5px' }} variant="body1" component="span">{createdAt}</Typography>
                            </Typography>
                        } />
                    </ListItemButton>
                </ListItem>
            })}
                
            </List>
            <DeleteAllButton>
                <Button variant="contained" color="secondary">Delete all</Button>
            </DeleteAllButton>
        </Container>
    </Box>;
};

export default ChatRequests;
