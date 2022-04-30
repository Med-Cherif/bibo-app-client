import { Link } from "react-router-dom"
import { styled, Paper, Typography, List,  Box } from "@mui/material"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux";
import UserItem from "./UserItem";

interface IProps {
    isSearchBoxOpen: boolean;
    searchValue: string;
}

const PaperStyled = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: '51.5px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxHeight: '450px',
    padding: '15px',
    maxWidth: '500px',
    overflow: 'auto',
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
}))


const BoxStyled = styled(Box)(({ theme }) => ({
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexWrap: 'wrap', 
    columnGap: '20px', 
    rowGap: '8px', 
    marginBottom: '16px'
}))

const SearchResult = ({ isSearchBoxOpen, searchValue }: IProps) => {
    const { searchedUsers } = useSelector((state: RootState) => state.user)
    return (
        <PaperStyled sx={{ display: isSearchBoxOpen ? "block" : "none" }}>
            <Box>
                <BoxStyled>
                    <Typography variant="h6" component="div">Search for people</Typography>
                    <Link to={`/search?query=${searchValue}`}>Go to the search page</Link>
                </BoxStyled>
                {
                    searchedUsers.length === 0 ? (
                        <Typography variant="body1">No users</Typography>
                    ) : (
                        <List>
                            {searchedUsers.map((user) => (
                                <UserItem key={user._id} {...user} />
                            ))}
                        </List>
                    )
                }
            </Box>
        </PaperStyled>
    )
}

export default SearchResult