import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { 
    Backdrop, 
    Paper, 
    Typography, 
    List,
    Stack,
    CircularProgress,
    styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getUserContactAction } from '../../redux/actions/userAction';
import ContactItem from './ContactItem';
import useGetFollowings from '../../hooks/useGetFollowings';

const PaperStyled = styled(Paper)(({ theme }) => ({
    position: 'relative',
    width: '100%', 
    maxWidth: '600px', 
    padding: '20px',
    maxHeight: '100vh',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
        padding: 0,
    },
    '&::-webkit-scrollbar': {
        width: '10px'
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
    }
}))

const CloseIconStyled = styled(CloseIcon)({
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    cursor: 'pointer',
    fontSize: '2rem'
})

interface IProps {
    userContact: {
        open: boolean;
        state: "followings" | "followers" | null
    },
    setUserContact: React.Dispatch<React.SetStateAction<{
        open: boolean,
        state: "followings" | "followers" | null
    }>>;
    _id: string | undefined
}

const Contact = ({ userContact, setUserContact, _id }: IProps) => {

    const dispatch = useDispatch()
    const { isLoading, ...rest } = useSelector((state: RootState) => state.user)
    
    useGetFollowings([userContact]);

    const closeUserContact = () => {
        setUserContact({
            open: false,
            state: null
        })
    }

    useEffect(() => {
        if (userContact.open && (userContact.state === 'followers' || userContact.state === 'followings') && _id) {
            dispatch(getUserContactAction(_id, userContact.state))
        }
    }, [userContact])

  return (
    <Backdrop
        sx={{
            zIndex: 9999,
        }}
        open={userContact.open}
    >
        <PaperStyled elevation={0}>
           <Typography align="center" variant="h4" gutterBottom sx={{ textTransform: 'capitalize' }}>{userContact.state && userContact.state}</Typography>
           {
               userContact.open && (
                    isLoading ? (
                        <Stack justifyContent="center" alignItems="center">
                            <CircularProgress color="secondary" />
                        </Stack>
                    ) : rest[userContact.state!] && (
                        <List>
                            {rest[userContact.state!].map((user) => (
                                <ContactItem closeUserContact={closeUserContact} key={user._id} {...user} />
                            ))}
                        </List>
                    )
               )
           }
           <CloseIconStyled onClick={closeUserContact} />
        </PaperStyled>
    </Backdrop>
  )
}

export default Contact