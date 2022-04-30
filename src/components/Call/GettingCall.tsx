import { useSelector } from 'react-redux';
import { Typography, Avatar, Box, Paper, styled, Stack } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import { IconWrapper } from "./Call"
import EndCallButton from './EndCallButton';
import { RootState } from '../../redux/store';
import { useCallState } from '../../context/CallContext';

const PaperStyled = styled(Paper)(({
    width: '100%',
    maxWidth: '600px',
    padding: '20px'
}));


const GettingCall = () => {

    const { caller, receivingCall, sdp } = useSelector((state: RootState) => state.call);
    const { acceptCall: accept, endCall } = useCallState();


    const acceptCall = () => {
        if (sdp && caller && receivingCall.type) {
            accept(caller._id, sdp, receivingCall.type);
        }
    }

    return (
        <PaperStyled elevation={0}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h5" component="h2">Incoming {receivingCall.type} call</Typography>
                <Avatar alt='User' src={`http://localhost:5000/${caller!.picture}`} sx={{ width: '180px', height: '180px' }} />
                <Box>
                    <Typography align="center" variant="body1" component="h4">{caller!.username}</Typography>
                    <Typography align="center" variant="body2" component="h6">{caller!.name}</Typography>
                </Box>
                <Stack direction="row" spacing={8}>
                    <IconWrapper onClick={acceptCall}>
                        {
                            receivingCall.type === 'video' ? <VideocamIcon /> : <CallIcon />
                        }
                    </IconWrapper>
                    <EndCallButton onClick={() => endCall(caller!._id)} />
                </Stack>
            </Stack>
        </PaperStyled>
    )
}

export default GettingCall