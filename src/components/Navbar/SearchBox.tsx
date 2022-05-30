import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import SearchResult from '../public/SearchResult';
import { useGlobalState } from '../../context/AppContext';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { searchForPeople } from '../../redux/actions/userAction';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      maxWidth: '400px',
      margin: 'auto'
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 4, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
  }));

  const CloseIconStyled = styled(CloseIcon)(({ theme }) => ({
    position: "absolute", 
    top: '50%', 
    right: theme.spacing(2), 
    transform: 'translateY(-50%)', 
    cursor: 'pointer'
  }))

const SearchBox = () => {

  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch()
  const { closeSearchBox, openSearchBox, isSearchBoxOpen } = useGlobalState();

  const searchPeople = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(searchForPeople(e.target.value))
    setSearchValue(e.target.value)
  }

    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' }, position: "relative", flex: 1 }} >
            <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onFocus={openSearchBox}
                  onChange={searchPeople}
                />
              <CloseIconStyled sx={{ display: isSearchBoxOpen ? 'block' : 'none' }} onClick={closeSearchBox} />
            </Search>
            <SearchResult searchValue={searchValue} isSearchBoxOpen={isSearchBoxOpen} />
        </Box>
    )
}

export default SearchBox
