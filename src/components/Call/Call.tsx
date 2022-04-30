import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Backdrop, styled } from '@mui/material';
import VideoCall from './VideoCall';
import GettingCall from './GettingCall';
import Calling from './Calling';
import VoiceCall from './VoiceCall';

export const IconWrapper = styled('div')({
    width: '60px',
    height: '60px',
    background: 'green',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '& > svg': {
        color: '#fff',
        fontSize: '32px'
    }
})

const Call = () => {

    const { accessToken } = useSelector((state: RootState) => state.auth)

    const { calling, isAudioCall, isVideoCall, receivingCall } = useSelector((state: RootState) => state.call);

    const open = calling.isCalling || isAudioCall || isVideoCall || receivingCall.isReceiving;
    
    return accessToken ? (
        <Backdrop
            open={open}
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1000,
            }}
        >
            {
                calling.isCalling 
                    ? <Calling /> :
                receivingCall.isReceiving 
                    ? <GettingCall /> :
                isVideoCall
                    ? <VideoCall /> :
                isAudioCall 
                    ? <VoiceCall /> :
                null
            }
        </Backdrop>
    ) : null
}

export default Call