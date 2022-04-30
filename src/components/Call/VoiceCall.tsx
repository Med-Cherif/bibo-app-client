import { useState, useEffect } from 'react';
import { Paper, styled, Stack, Typography, Grid, Box } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import EndCallButton from './EndCallButton';
import ToggleStreamButton from './ToggleStreamButton';
import { useCallState } from '../../context/CallContext';
import useToggleStream from '../../hooks/useToggleStream';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const PaperStyled = styled(Paper)({
    width: '100%',
    maxWidth: '350px',
    height: '70vh',
    position: 'relative',
})

export const BgImage = styled('div')({
    backgroundImage: 'url("https://www.linguahouse.com/linguafiles/md5/032c7282f877b86c74e0a97d0b8bb7e8")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    filter: 'blur(8px)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0
})

export const Wrapper = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const BoxCenter = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const TimingText = styled(Typography)({
    padding: '6px',
    width: 'fit-content',
    margin: '8px auto',
    borderRadius: '6px',
    background: '#fff',
    fontSize: '16px',
    letterSpacing: '1px',
})

const VoiceCall = () => {
    const [isMicEnable, setIsMicEnable] = useState(true)
    const [callTime, setCallTime] = useState(0);

    const { otherUser } = useSelector((state: RootState) => state.call)

    const { myAudioRef, remoteAudioRef, localStream, remoteStream, endCall } = useCallState()

    const toggleMic = () => {
        setIsMicEnable((prev) => !prev);
    }

    const displayCallTime = () => {

        let hours: string | number = Math.floor(callTime / 3600);
        let minutes: string | number = Math.floor((callTime % 3600) / 60);
        let seconds: string | number = Math.floor((callTime % 3600) % 60);

        if (hours < 10) {
            hours = `0${hours}`
        }

        if (minutes < 10) {
            minutes = `0${minutes}`
        }

        if (seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${hours}:${minutes}:${seconds}`
    }

    useToggleStream(localStream, isMicEnable, 'audio');

    useEffect(() => {
        if (remoteStream.current && remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = remoteStream.current;
        }
        if (localStream.current && myAudioRef.current) {
            myAudioRef.current.srcObject = localStream.current;
        }
    }, [])

    useEffect(() => {
        let timeout = setTimeout(() => {
            setCallTime((prev) => prev + 1);
        }, 1000)
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [callTime])
    

    return (
        <PaperStyled elevation={0}>
            <BgImage />
            <audio autoPlay muted ref={myAudioRef} />
            <audio autoPlay ref={remoteAudioRef} />
            <Wrapper>
                <Stack spacing={8}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" component="h2">{otherUser!.name}</Typography>
                        <TimingText variant='subtitle2'>{displayCallTime()}</TimingText>
                        <Typography sx={{
                            color: isMicEnable ? 'green' : 'red',
                            fontWeight: '600'
                        }}>
                            {
                                isMicEnable ? 'Microphone on' : 'Microphone off'
                            }
                        </Typography>
                    </Box>
                    <BoxCenter>
                        <ToggleStreamButton 
                            toggleStream={toggleMic}
                            OnIcon={<MicIcon sx={{ color: '#000' }} />}
                            OffIcon={<MicOffIcon sx={{ color: '#000' }} />}
                            isEnabled={isMicEnable}   
                        />
                    </BoxCenter>
                    <BoxCenter>
                        <EndCallButton onClick={() => endCall(otherUser!._id)} />
                    </BoxCenter>
                </Stack>
            </Wrapper>
        </PaperStyled>
    )
}

export default VoiceCall