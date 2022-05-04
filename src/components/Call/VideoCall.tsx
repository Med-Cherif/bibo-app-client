import { useEffect, useRef, useState } from 'react';
import { Paper, styled, Stack, Typography, Grid, Box } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import EndCallButton from './EndCallButton';
import ToggleStreamButton from './ToggleStreamButton';
import MyVideoCall from './MyVideoCall';
import useToggleStream from '../../hooks/useToggleStream';
import { useCallState } from '../../context/CallContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const PaperStyled = styled(Paper)({
    width: '100%',
    maxWidth: '650px',
    height: '90vh',
    position: 'relative',
})

const Wrapper = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

const RemoteVideo = styled('video')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1
})

const VideoCall = () => {

    const { localStream, localVideoRef, remoteVideoRef, remoteStream, endCall } = useCallState()
    const { otherUser } = useSelector((state: RootState) => state.call)

    const [callTime, setCallTime] = useState(0);

    const [isMicEnable, setIsMicEnable] = useState(true);
    const [isCameraEnable, setIsCameraEnable] = useState(true);
    const [isCallStatusVisible, setIsCallStatusVisible] = useState(false);
    const timeout = useRef<NodeJS.Timeout>()
    useToggleStream(localStream, isMicEnable, 'audio');
    useToggleStream(localStream, isCameraEnable, 'video');

    const toggleMic = () => {
        setIsMicEnable((prev) => !prev);
    }

    const toggleCamera = () => {
        setIsCameraEnable((prev) => !prev);
    }

    useEffect(() => {
        
        if (remoteStream.current && remoteVideoRef.current) {
            remoteStream.current.getTracks().forEach((track) => {
                alert(`${track.kind} ${track.enabled}`);
            })
            remoteVideoRef.current.srcObject = remoteStream.current;
        }
        if (localStream.current && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream.current;
        }
    }, [])

    const handleCallStatus = () => {
        if (timeout.current) {
            clearInterval(timeout.current);
        }
        setIsCallStatusVisible(true);

        timeout.current = setTimeout(() => {
            setIsCallStatusVisible(false);
        }, 3000)
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
        <PaperStyled onMouseMove={handleCallStatus} elevation={0}>
            <RemoteVideo autoPlay ref={remoteVideoRef} />
            { isCallStatusVisible && (
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
                            <Typography sx={{
                                color: isCameraEnable ? 'green' : 'red',
                                fontWeight: '600'
                            }}>
                                {
                                    isCameraEnable ? 'Camera on' : 'Camera off'
                                }
                            </Typography>
                        </Box>
                        <BoxCenter
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '16px'
                            }}
                        >
                            <ToggleStreamButton 
                                toggleStream={toggleCamera}
                                OnIcon={<VideocamIcon sx={{ color: '#000' }} />}
                                OffIcon={<VideocamOffIcon sx={{ color: '#000' }} />}
                                isEnabled={isCameraEnable}   
                            />

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
            )}
           <MyVideoCall myVideoRef={localVideoRef} /> 
        </PaperStyled>
    )
}

export default VideoCall