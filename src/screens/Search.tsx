import { Box, InputBase, List, styled } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import UserItem from "../components/public/UserItem"
import { searchForPeopleInSearchScreen } from "../redux/actions/userAction"
import { RootState } from "../redux/store"

const SearchScreenContainer = styled('div')(() => ({
    padding: '30px 20px',
}))

const InputContainer = styled('div')(() => ({
    width: '100%',
    maxWidth: '380px',
    margin: 'auto',
    border: '1px solid #333',
    borderRadius: '30px'
}))

const InputBaseStyled = styled(InputBase)({
    width: '100%',
    '& .css-yz9k0d-MuiInputBase-input': {
        height: '50px',
        padding: '0 20px',
    }
})

const BoxStyled = styled('div')(() => ({
    width: '100%',
    padding: '20px',
    background: '#f9f9f9',
    maxWidth: '800px',
    margin: 'auto',
    marginTop: '20px',
    height: 'calc(100vh - 196px)',
    overflow: 'auto'
}))

const Search = () => {

    const dispatch = useDispatch()
    const { searchedUsersScreen } = useSelector((state: RootState) => state.user)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(searchForPeopleInSearchScreen(e.target.value))
    }

    return (
        <SearchScreenContainer>
            <InputContainer>
                <InputBaseStyled
                    placeholder="Search..."
                    onChange={handleSearch}
                />
            </InputContainer>
            <BoxStyled>
                <List>
                    {
                        searchedUsersScreen.map((user) => (
                            <UserItem key={user._id} {...user} />
                        ))
                    }
                </List>
            </BoxStyled>
        </SearchScreenContainer>
    )
}

export default Search
