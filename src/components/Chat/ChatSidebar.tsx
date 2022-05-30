import { useEffect, useState } from "react";
import { Box, styled, Divider, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ChatSidebarBody from "./ChatSidebarBody";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const BoxStyled = styled(Box)({
    background: '#eee',
    height: '100%',
    paddingTop: '20px'
})

const BoxHeader = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    padding: '0 20px'
})

const SearchContainer = styled(Box)({
    width: '100%',
    maxWidth: '400px',
    height: '100%',
    position: 'relative',
    borderRadius: '30px',
    border: '1px solid #333'
})

const InputBaseStyled = styled(InputBase)({
    width: '100%',
    height: '100%',
    paddingLeft: '50px'
})

const SearchIconStyled = styled(SearchIcon)({
    position: 'absolute',
    top: '50%',
    left: '1rem',
    transform: 'translateY(-50%)',
})

const ChatSidebar = ({ setSearchParams }: any) => {
    const { chats } = useSelector((state: RootState) => state.chat);
    const [filteredChats, setFilteredChats] = useState([]);

    useEffect(() => {
        setFilteredChats(chats)
    }, [chats])

    const searchInChats = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value === "") {
            setFilteredChats(chats)
        } else {
            const newChats = chats.filter((chat: any) => chat.user.username.includes(e.target.value))
            setFilteredChats(newChats)
        }
    }

    return (
        <BoxStyled>
            <BoxHeader>
                <SearchContainer>
                    <SearchIconStyled fontSize="medium" />
                    <InputBaseStyled
                        placeholder="Search..."
                        onChange={searchInChats}
                    />
                </SearchContainer>
            </BoxHeader>
            <Divider sx={{ marginTop: '20px' }} />
            <ChatSidebarBody chats={filteredChats} setSearchParams={setSearchParams} />
        </BoxStyled>
    )
}

export default ChatSidebar
