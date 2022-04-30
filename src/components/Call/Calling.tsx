import { useEffect } from 'react';
import { Paper, styled, Typography, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import EndCallButton from './EndCallButton';
import { BgImage, Wrapper } from './VoiceCall';
import { useCallState } from '../../context/CallContext';

const PaperStyled = styled(Paper)({
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    position: 'relative',
    height: '50vh'
})

const Calling = () => {
    const { calling } = useSelector((state: RootState) => state.call);
    const { endCall } = useCallState();

    useEffect(() => {
        let timeout = setTimeout(() => {
            endCall(calling.userID!);
        }, 10 * 1000)

        return () => {
            clearTimeout(timeout)
        }

    }, [])

    return (
        <PaperStyled>
            <BgImage />
            <Wrapper>
                <Stack alignItems="center" spacing={2} sx={{ padding: '20px' }}>
                    <Typography variant="h5" component="h2">You are making {`${calling.type === 'audio' ? 'an' : 'a'} ${calling.type}`} call...</Typography>
                    <EndCallButton onClick={() => endCall(calling.userID!)} />
                </Stack>
            </Wrapper>
        </PaperStyled>
    )
}

export default Calling