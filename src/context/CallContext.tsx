import { createContext, useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGlobalState } from './AppContext';
import { callActions } from "../redux/slices/callSlice";

interface CallStateContext  {
    // peerConnection: React.MutableRefObject<RTCPeerConnection | undefined>,
    localStream: React.MutableRefObject<MediaStream | undefined>,
    remoteStream: React.MutableRefObject<MediaStream | undefined>,
    makeCall: (userID: string, type: 'audio' | 'video') => Promise<void>;
    localVideoRef: React.RefObject<HTMLVideoElement>;
    remoteVideoRef: React.RefObject<HTMLVideoElement>;
    acceptCall: (userID: string, sdp: RTCSessionDescriptionInit, type: 'audio' | 'video') => Promise<void>;
    endCall: (userID: string) => void;

    myAudioRef: React.RefObject<HTMLAudioElement>;
    remoteAudioRef: React.RefObject<HTMLAudioElement>;
}

const CallContext = createContext({})

const configuration: RTCConfiguration = {
    iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443?transport=tcp",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ],
  };

const CallProvider = ({ children }: { children: React.ReactNode }) => {

    const { socket } = useGlobalState();
    const dispatch = useDispatch();

    const { userData } = useSelector((state: RootState) => state.auth)

    const myAudioRef = useRef<HTMLAudioElement>(null)
    const remoteAudioRef = useRef<HTMLAudioElement>(null)

    
    const peerConnection = useRef<RTCPeerConnection>();
    const localStream = useRef<MediaStream>();
    const remoteStream = useRef<MediaStream>();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    function registerPeerConnectionListeners(peer: RTCPeerConnection) {
        peer.addEventListener('icegatheringstatechange', () => {
          console.log(
              `ICE gathering state changed: ${peer.iceGatheringState}`);
        });
      
        peer.addEventListener('connectionstatechange', () => {
          console.log(`Connection state change: ${peer.connectionState}`);
        });
      
        peer.addEventListener('signalingstatechange', () => {
          console.log(`Signaling state change: ${peer.signalingState}`);
        });
      
        peer.addEventListener('iceconnectionstatechange ', () => {
          console.log(
              `ICE connection state change: ${peer.iceConnectionState}`);
        });
      }
    
    function createPeer(userID: string, type: 'audio' | 'video') {
        const peer = new RTCPeerConnection(configuration); 
        peer.ontrack = onTrackEvent;
        peer.onicecandidate = onIceCandidateEvent(userID);
        return peer;
    }

    function onTrackEvent(e: RTCTrackEvent) {
        if (remoteStream.current) {
            e.streams[0].getTracks().forEach((track) => {
                remoteStream.current!.addTrack(track)
            });
        }
    }

    function onIceCandidateEvent (userID: string) {
        return (e: RTCPeerConnectionIceEvent) => {
            if (e.candidate) {
                socket.emit('ice-candidate', {
                    userID,
                    candidate: e.candidate.candidate,
                    sdpMLineIndex: e.candidate.sdpMLineIndex,
                    sdpMid: e.candidate.sdpMid
                })
            }
        }
    }

    function handlingOffer(payload: any) {
        dispatch(callActions.receivingCall({
            type: payload.type,
            caller: payload.caller,
            sdp: payload.sdp
        }))
    }

    function handlingAnswer({ sdp, myData, type }: { sdp: RTCSessionDescriptionInit, myData: any, type: 'audio' | 'video' } ) {
        if (peerConnection.current) {
            const desciption = new RTCSessionDescription(sdp);
            peerConnection.current.setRemoteDescription(desciption)
                .then(() => {
                    if (type === 'video') {
                        dispatch(callActions.gettingAnswerVideoCall(myData));
                    }

                    if (type === 'audio') {
                        dispatch(callActions.gettingAnswerVoiceCall(myData));
                    }
                })
        }
    }

    function resetCallData() {
        peerConnection.current?.close();
        peerConnection.current = undefined;
        localStream.current?.getTracks().forEach((track) => track.stop());
        localStream.current = undefined;
        remoteStream.current?.getTracks().forEach((track) => track.stop());
        remoteStream.current = undefined;
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }
        if (myAudioRef.current) {
            myAudioRef.current.srcObject = null;
        }
        if (remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = null
        }
        
        dispatch(callActions.endCall());
    }

    function endCall(userID: string) {
        resetCallData();
        socket.emit('end call', userID);
    }

    function handleEndingCall() {
        resetCallData();
    }

    async function acceptCall(userID: string, sdp: RTCSessionDescriptionInit, type: 'video' | 'audio') {
        
        let constraints: MediaStreamConstraints = {};
        if (type === 'video') {
            constraints = { video: true, audio: true }
        }
        if (type === 'audio') {
            constraints = { audio: true }
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            localStream.current = stream;
            remoteStream.current = new MediaStream();
            peerConnection.current = createPeer(userID, type);
            registerPeerConnectionListeners(peerConnection.current);
            localStream.current.getTracks().forEach((track) => {
                peerConnection.current!.addTrack(track, localStream.current!)
            })
            const sessionDescription = new RTCSessionDescription(sdp);
            await peerConnection.current.setRemoteDescription(sessionDescription);
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer)

            if (type === 'audio') {
                dispatch(callActions.acceptVoiceCall())
            }

            if (type === 'video') {
                dispatch(callActions.acceptVideoCall())
            }

            const payload = {
                caller: userID,
                sdp: answer,
                myData: {
                    _id: userData!._id,
                    name: userData!.name,
                    username: userData!.username,
                    picture: userData!.picture
                },
                type
            }
            socket.emit('answer', payload)
        } catch (error) {
            alert(JSON.stringify(error))
        }    
    }

    const makeCall = async (userID: string, type: 'audio' | 'video') => {
        let constraints: MediaStreamConstraints = {};

        if (type === 'video') {
            constraints = {
                video: true, audio: true
            }
        } 

        if (type === 'audio') {
            constraints = {
                audio: true
            }
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            localStream.current = stream;
            remoteStream.current = new MediaStream();
            peerConnection.current = createPeer(userID, type);
            registerPeerConnectionListeners(peerConnection.current);

            localStream.current.getTracks().forEach((track) => {
                peerConnection.current!.addTrack(track, localStream.current!)
            });

            const sdp = await peerConnection.current!.createOffer();
            await peerConnection.current!.setLocalDescription(sdp);
            
            const payload = {
                to: userID,
                caller: {
                    _id: userData!._id,
                    name: userData!.name,
                    username: userData!.username,
                    picture: userData!.picture
                },
                sdp,
                type
            }

            dispatch(callActions.callUser({
                callType: type,
                userID
            }))

            socket.emit('offer', payload)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        socket.on('end call', handleEndingCall)

        socket.on('offer', handlingOffer);

        socket.on('answer', handlingAnswer);

        socket.on('ice-candidate', async ({ candidate, sdpMLineIndex, sdpMid }) => {
            if (peerConnection.current) {
                const rtcIceCandidate = new RTCIceCandidate({ candidate, sdpMLineIndex, sdpMid });
                await peerConnection.current.addIceCandidate(rtcIceCandidate)
            }
        })
    }, [])

    return (
        <CallContext.Provider value={{
            remoteStream,
            localStream,
            localVideoRef,
            makeCall,
            remoteVideoRef,
            acceptCall,
            endCall,
            myAudioRef,
            remoteAudioRef
        }}>
            {children}
        </CallContext.Provider>
    )
}

export default CallProvider

export const useCallState = () => {
    return useContext(CallContext) as CallStateContext
}